import globby from 'globby';
import R from 'ramda';
import contract from 'neat-contract';
import Promise from 'pinkie-promise';

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

// allFiles :: String -> Promise Array[String]
const allFiles = R.unary(R.pipeP(toPromise,
  contract('path', String),
  path => globby([
    '**/*.{js,json}',
    '!**/node_modules/**',
    '!**/fixtures/**',
  ], { cwd: path })
));

// testFiles :: String -> Promise Array[String]
const testFiles = R.unary(R.pipeP(toPromise,
  contract('path', String),
  path => globby([
    'test.js',
    '**/test/*.js',
    '**/*.test.js',
    '**/__test__/*.js',
    '!**/node_modules/**',
    '!**/fixtures/**',
  ], { cwd: path })
));

export default { allFiles, testFiles };
