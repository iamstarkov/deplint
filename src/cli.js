/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import Promise from 'pinkie-promise';
import fs from './fs';
import pkgEsDeps from './pkg-es-deps';
import kit from 'es-dep-kit';
import loadJsonFile from 'load-json-file';
import isBuiltinModule from 'is-builtin-module';

// fs('./')
  // .then(console.log)
  // .catch(console.error);

Promise.all([
  loadJsonFile('./package.json'),
  fs('./'),
  pkgEsDeps('./package.json'),
]).then(([pkg, allFiles, deps]) => {
  // console.log(pkg);
  const actualUsedFiles = deps
    .filter(R.either(kit.isEntry, kit.isRequestedLocalFile))
    .filter(kit.isResolved)
    .map(kit._resolved);

  console.log('All files: ', allFiles.length);
  console.log('Actually used files: ', actualUsedFiles.length);
  console.log('');

  const allProdDeps = R.pipe(R.prop('dependencies'), R.keys)(pkg);
  const actualUsedModules = R.pipe(
    R.filter(kit.isRequestedPackage),
    R.map(kit._requested),
    R.map(R.pipe(R.split('/'), R.head)),
    R.reject(isBuiltinModule)
  )(deps);

  console.log('All prod modules: ', allProdDeps.length);
  console.log('Actually used prod modules: ', actualUsedModules.length);
})
.catch(console.error);
