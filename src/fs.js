import globby from 'globby';
import R from 'ramda';
import contract from 'neat-contract';
import Promise from 'pinkie-promise';

// toPromise :: a -> Promise a
const toPromise = Promise.resolve.bind(Promise);

// fs :: String -> Promise Array[String]
const fs = R.unary(R.pipeP(toPromise,
  contract('path', String),
  path => globby([
    '**/*.{js,json}',
    '!**/node_modules/**',
    '!**/fixtures/**',
  ], { cwd: path })
));

export default fs;
