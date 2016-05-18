/* eslint-disable no-underscore-dangle */
import path from 'path';
import R from 'ramda';
import Promise from 'pinkie-promise';
import { allFiles } from './fs';
import pkgEsDeps from './pkg-es-deps';
// import kit from 'es-dep-kit';
import loadJsonFile from 'load-json-file';
// import isBuiltinModule from 'is-builtin-module';

const log = console.log; // eslint-disable-line
const err = console.error; // eslint-disable-line

// log('yo');
const relativeToCwd = _ => path.relative(process.cwd(), _);

Promise.all([
  loadJsonFile('./package.json'),
  pkgEsDeps.prod('./package.json'),
  pkgEsDeps.dev('./'),
  allFiles('./'),
]).then(([
  { name: pkgName },
  prodFiles,
  devFiles,
  _existingFiles,
]) => {
  const usedFiles = R.union(prodFiles, devFiles);
  const existingFiles = _existingFiles.map(_ => path.join(process.cwd(), _));
  const unusedFiles = R.difference(existingFiles, usedFiles);
  return { pkgName, usedFiles, existingFiles, unusedFiles };
}).then(({ pkgName, usedFiles, existingFiles, unusedFiles }) => {
  log(`\`${pkgName}\` uses ${usedFiles.length} files out of ${existingFiles.length} existing`);
  log('Unused Files:');
  log(unusedFiles.map(relativeToCwd).map(_ => `  ✗ ${_}`).join('\n'));
})
.catch(err);
