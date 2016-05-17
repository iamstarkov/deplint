/* eslint-disable no-underscore-dangle */

import R from 'ramda';
import _deep from 'es-deps-deep';
// import loadJson from 'load-json-file';
// import entry from 'pkg-entry';
import Promise from 'pinkie-promise';
import contract from 'neat-contract';
import kit from 'es-dep-kit';
import pkgEntryAndBinResolved from 'pkg-entry-and-bin-resolved';
import p from 'path';
import { testFiles } from './fs';

const deep = R.curryN(2, _deep);

/**
 * debug mode
 */
const log = console.log;
const id = R.identity;

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

// all :: [Promise] -> Promise
const all = Promise.all.bind(Promise);


// pkgEsDeps :: String -> Promise [Object]
function pkgEsDeps(pkg) {
  return R.pipeP(toPromise,
    contract('pkg', String),
    pkgEntryAndBinResolved,
    deep(R.__, { excludeFn: kit.isThirdParty }),
    R.filter(kit.isResolved),
    R.map(kit._resolved),
    id
  )(pkg);
}

// pkgEsDepsTest :: String -> Promise [Object]
function pkgEsDepsTest(path) {
  return R.pipeP(toPromise,
    contract('path', String),
    testFiles,
    R.map(R.pipe(
      _ => p.join(path, _),
      _ => `./${_}`
    )),
    deep(R.__, { excludeFn: kit.isThirdParty }),
    R.filter(kit.isResolved),
    R.filter(R.either(kit.isEntry, kit.isRequestedLocalFile)),
    R.map(kit._resolved),
    id
  )(path);
}

export default { pkgEsDeps, pkgEsDepsTest };
