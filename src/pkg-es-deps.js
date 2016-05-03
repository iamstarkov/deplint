/* eslint-disable no-underscore-dangle */

import R from 'ramda';
import _deep from 'es-deps-deep';
import loadJson from 'load-json-file';
import entry from 'pkg-entry';
import Promise from 'pinkie-promise';
import contract from 'neat-contract';
import resolveCwd from 'resolve-cwd';
import kit from 'es-dep-kit';

const deep = R.curryN(2, _deep);

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

// pkgEsDeps :: void -> Promise Array[Object]
function pkgEsDeps(file) {
  return R.pipeP(toPromise,
    contract('file', String),
    resolveCwd,
    contract('file', String),
    loadJson,
    entry,
    R.tap(console.log),
    deep(R.__, { excludeFn: kit.isThirdParty })
  )(file);
}

export default pkgEsDeps;
