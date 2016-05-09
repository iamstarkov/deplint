/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import Promise from 'pinkie-promise';
import { allFiles, testFiles } from './fs';
// import { pkgEsDeps, pkgEsDepsTest } from './pkg-es-deps';
import kit from 'es-dep-kit';
// import loadJsonFile from 'load-json-file';
// import isBuiltinModule from 'is-builtin-module';

const log = console.l eslint-disable-line
const thr = msg => { throw msg; };

Promise.all([
  allFiles('./'),
]).then(([
  allFilesList,
]) => {
  // console.log(pkg);
  /*
  const actualUsedFiles = deps
    .filter(R.either(kit.isEntry, kit.isRequestedLocalFile))
    .filter(kit.isResolved)
    .map(kit._resolved);
  */

  log('Files');
  log('  All ', allFilesList.length);
  log('  Used', actualUsedFiles.length);

  /*
  const allProdDeps = R.pipe(R.prop('dependencies'), R.keys)(pkg);
  const allDeps = R.pipe(R.props(['d', 'v']), R.mergeAll, R.keys);
  const getModules = R.pipe(
    R.filter(kit.isRequestedPackage),
    R.map(kit._requested),
    R.map(R.pipe(R.split('/'), R.head)),
    R.reject(isBuiltinModule)
  );

  const actualUsedModules = getModules(deps);
  const actualTestModules = getModules(depsTestList);

  log('Modules');
  log('  Declared', allProdDeps.length);
  log('  Actual  ', actualUsedModules.length);
  log('Dev Modules');
  log('  Declared', allDeps.length);
  log('  Actual  ', actualUsedModules.length);
  */
})
.catch(thr);
