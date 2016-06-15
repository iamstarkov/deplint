import test from 'ava';
import path from 'path';
import { allFiles, testFiles } from '../src/fs';
import R from 'ramda';

/**
 * preFixtures
 *
 * Take "root" argument, resolve it and prepend it with path.join to second "file" argument, curried
 *
 * @example
 *
 *     const prependWithFs = preFixtures('./fixtures/fs');
 *     prependWithFs('index.js'); // /Users/iamstarkov/projects/deplint/test/fixtures/fs/index.js
 */
// preFixtures -> String -> String -> String
const preFixtures = R.curry((root, file) => path.join(path.resolve(root), file));

test('allFiles', async t => {
  const actual = await allFiles('./fixtures/fs/');
  const expected = R.map(preFixtures('./fixtures/fs/'), [
    'components/menu/__test__/menu.js',
    'components/menu/menu.js',
    'components/menu/menu.test.js',
    'index.js',
    'lost-unicorn.js',
    'nested/yo.js',
    'q.json',
    'test.js',
    'test/yo.js',
  ]);

  t.is(actual.length, 9);
  t.deepEqual(actual, expected);
});

test('allFiles :: empty input', t => t.throws(allFiles(), TypeError));
test('allFiles :: invalid input', t => t.throws(allFiles(2), TypeError));

test('testFiles', async t => {
  const actual = await testFiles('./fixtures/fs/');
  const expected = R.map(preFixtures('./fixtures/fs/'), [
    'test.js',
    'test/yo.js',
    'components/menu/menu.test.js',
    'components/menu/__test__/menu.js',
  ]);

  t.is(actual.length, 4);
  t.deepEqual(actual, expected);
});

test('testFiles :: empty input', t => t.throws(testFiles(), TypeError));
test('testFiles :: invalid input', t => t.throws(testFiles(2), TypeError));
