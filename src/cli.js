/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import Promise from 'pinkie-promise';
import { allFiles } from './fs';
import pkgEsDeps from './pkg-es-deps';
import kit from 'es-dep-kit';
import loadJsonFile from 'load-json-file';
import isBuiltinModule from 'is-builtin-module';

const log = console.log;

Promise.all([
  loadJsonFile('./package.json'),
  allFiles('./'),
  pkgEsDeps('./package.json'),
]).then(([pkg, allFilesList, deps]) => {
  // console.log(pkg);
  const actualUsedFiles = deps
    .filter(R.either(kit.isEntry, kit.isRequestedLocalFile))
    .filter(kit.isResolved)
    .map(kit._resolved);

  log('Files');
  log('  Prod', actualUsedFiles.length);
  log('  Overall', allFilesList.length);

  const allProdDeps = R.pipe(R.prop('dependencies'), R.keys)(pkg);
  const actualUsedModules = R.pipe(
    R.filter(kit.isRequestedPackage),
    R.map(kit._requested),
    R.map(R.pipe(R.split('/'), R.head)),
    R.reject(isBuiltinModule)
  )(deps);

  log('Modules');
  log('  Prod', actualUsedModules.length);
  log('  Overall', allProdDeps.length);
})
.catch(console.error);
