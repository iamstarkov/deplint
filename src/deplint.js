import path from 'path';
import Promise from 'pinkie-promise';
import { allFiles } from './fs';
import pkgEsDeps from './pkg-es-deps';
import loadJsonFile from 'load-json-file';
import computation from './computation';

function deplint(root) {
  console.log(root);
  return Promise.all([
    loadJsonFile(path.join(root, 'package.json')),
    pkgEsDeps.prod(path.join(root, 'package.json')),
    pkgEsDeps.dev(root),
    allFiles(root),
  ]).then(computation);
}

export default deplint;
