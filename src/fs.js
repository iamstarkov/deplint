import globby from 'globby';
import R from 'ramda';
import contract from 'neat-contract';
import Promise from 'pinkie-promise';
import path from 'path';

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

/**
 * debug mode
 */
const log = console.log;
const id = R.identity;

const excludes = [
  '!package.json',
  '!**/node_modules/**',
  '!**/fixtures/**',
];

// allFiles :: String -> Promise [String]
const allFiles = root => R.unary(R.pipeP(toPromise,
  contract('root', String),
  () => globby(R.concat([
    '**/*.{js,json}',
  ], excludes), { cwd: root }),
  R.map(_ => path.join(path.resolve(root), _)),
  id
))(root);

// testFiles :: String -> Promise [String]
const testFiles = root => R.unary(R.pipeP(toPromise,
  contract('root', String),
  () => globby(R.concat([
    'test.js',
    'test-*.js',
    'test/**/*.js',
    '**/*.test.js',
    '**/__{test,tests}__/**/*.js',
  ], excludes), { cwd: root }),
  R.map(_ => path.join(path.resolve(root), _)),
  id
))(root);

export default { allFiles, testFiles };
