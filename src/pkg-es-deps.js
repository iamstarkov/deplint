/* eslint-disable no-underscore-dangle */

import R from 'ramda';
import _deep from 'es-deps-deep';
import loadJson from 'load-json-file';
import entry from 'pkg-entry';
import Promise from 'pinkie-promise';
import contract from 'neat-contract';
import resolveCwd from 'resolve-cwd';
import kit from 'es-dep-kit';
import p from 'path';

const deep = R.curryN(2, _deep);

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

// all :: [Promise] -> Promise
const all = Promise.all.bind(Promise);

// getEntry :: String -> Promise String
const getEntry = R.pipeP(loadJson, entry);

// resolvePath :: Promise... -> String
const resolvePath = R.pipeP(R.unapply(all), R.apply(p.resolve));

// pkgEsDeps :: void -> Promise Array[Object]
function pkgEsDeps(pkg) {
  return R.pipeP(toPromise,
    contract('pkg', String),
    resolveCwd,
    contract('pkg', String),
    R.converge(resolvePath, [p.dirname, getEntry]),
    R.of,
    deep(R.__, { excludeFn: kit.isThirdParty })
  )(pkg);
}

export default pkgEsDeps;
