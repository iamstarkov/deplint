import globby from 'globby';
import R from 'ramda';
import contract from 'neat-contract';
import Promise from 'pinkie-promise';

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

const excludes = [
  '!package.json',
  '!**/node_modules/**',
  '!**/fixtures/**',
];

// allFiles :: String -> Promise Array[String]
const allFiles = R.unary(R.pipeP(toPromise,
  contract('path', String),
  path => globby(R.concat([
    '**/*.{js,json}',
  ], excludes), { cwd: path })
));

// testFiles :: String -> Promise Array[String]
const testFiles = R.unary(R.pipeP(toPromise,
  contract('path', String),
  path => globby(R.concat([
    'test.js',
    '**/test/*.js',
    '**/*.test.js',
    '**/__test__/*.js',
  ], excludes), { cwd: path })
));

export default { allFiles, testFiles };
