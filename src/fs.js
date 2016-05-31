import globby from 'globby';
import R from 'ramda';
import contract from 'neat-contract';
import Promise from 'pinkie-promise';

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

// allFiles :: String -> Promise Array[String]
const allFiles = entry => R.unary(R.pipeP(toPromise,
  contract('path', String),
  path => globby(R.concat([
    '**/*.{js,json}',
  ], excludes), { cwd: path }),
  id
))(entry);

// testFiles :: String -> Promise Array[String]
const testFiles = R.unary(R.pipeP(toPromise,
  contract('path', String),
  path => globby(R.concat([
    'test.js',
    'test-*.js',
    'test/**/*.js',
    '**/*.test.js',
    '**/__{test,tests}__/**/*.js',
  ], excludes), { cwd: path }),
  id
));

export default { allFiles, testFiles };
