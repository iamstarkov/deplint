/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import Promise from 'pinkie-promise';
import { allFiles } from './fs';
import { pkgEsDeps, pkgEsDepsTest } from './pkg-es-deps';
// import kit from 'es-dep-kit';
import loadJsonFile from 'load-json-file';
// import isBuiltinModule from 'is-builtin-module';

const log = console.log; // eslint-disable-line
const err = console.error; // eslint-disable-line

// log('yo');

Promise.all([
  loadJsonFile('./package.json'),
  pkgEsDeps('./package.json'),
  pkgEsDepsTest('./'),
  allFiles('./'),
]).then(([
  { name: pkgName },
  prodFiles,
  testFiles,
  existingFiles,
]) => {
  const usedFiles = R.union(prodFiles, testFiles);
  log(usedFiles);
  log(existingFiles);
  log(`\`${pkgName}\` uses ${usedFiles.length} files out of ${existingFiles.length} existing`);
})
.catch(err);
