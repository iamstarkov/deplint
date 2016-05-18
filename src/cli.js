/* eslint-disable no-underscore-dangle */
import path from 'path';
import R from 'ramda';
import Promise from 'pinkie-promise';
import { allFiles } from './fs';
import pkgEsDeps from './pkg-es-deps';
// import kit from 'es-dep-kit';
import loadJsonFile from 'load-json-file';
// import isBuiltinModule from 'is-builtin-module';
import kit from 'es-dep-kit';

const prodModules = R.pipe(R.prop('dependencies'), R.values);
const devModules = R.pipe(R.prop('devDependencies'), R.values);
const preCwd = _ => path.join(process.cwd(), _);

const log = console.log; // eslint-disable-line
const err = console.error; // eslint-disable-line

const _files = R.pipe(
  R.filter(kit.isResolved),
  R.filter(R.either(kit.isEntry, kit.isRequestedLocalFile)),
  R.map(kit._resolved)
);


// log('yo');
const relativeToCwd = _ => path.relative(process.cwd(), _);

Promise.all([
  loadJsonFile('./package.json'),
  pkgEsDeps.prod('./package.json'),
  pkgEsDeps.dev('./'),
  allFiles('./'),
]).then(([
  pkg,
  prodDeps,
  devDeps,
  _existingFiles,
]) => {
  const pkgName = pkg.name;
  const prodFiles = _files(prodDeps);
  const devFiles = _files(devDeps);

  const usedFiles = R.union(prodFiles, devFiles);
  const existingFiles = _existingFiles.map(preCwd);
  const unusedFiles = R.difference(existingFiles, usedFiles);

  const declaredProdModules = prodModules(pkg);
  const declaredDevModules = devModules(pkg);

  return {
    pkgName,
    usedFiles,
    existingFiles,
    unusedFiles,
    declaredProdModules,
    declaredDevModules,
  };
}).then(({ pkgName, usedFiles, existingFiles, unusedFiles, declaredProdModules }) => {
  log(`\`${pkgName}\` uses ${usedFiles.length} files out of ${existingFiles.length} existing`);
  log(`\`${pkgName}\` uses ${'meow'} prod modules out of ${declaredProdModules.length} declared`);
  log('Unused Files:');
  log(unusedFiles.map(relativeToCwd).map(_ => `  ✗ ${_}`).join('\n'));
})
.catch(err);
