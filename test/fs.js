import test from 'ava';
import { allFiles, testFiles } from '../src/fs';

test('allFiles', async t => {
  const _ = await allFiles('./fixtures/fs');
  t.is(_.length, 9);
  t.deepEqual(_, [
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
});

test('allFiles :: empty input', t => t.throws(allFiles(), TypeError));
test('allFiles :: invalid input', t => t.throws(allFiles(2), TypeError));

test('testFiles', async t => {
  const _ = await testFiles('./fixtures/fs');
  t.deepEqual(_, [
    'test.js',
    'test/yo.js',
    'components/menu/menu.test.js',
    'components/menu/__test__/menu.js',
  ]);
  t.is(_.length, 4);
});

test('testFiles :: empty input', t => t.throws(testFiles(), TypeError));
test('testFiles :: invalid input', t => t.throws(testFiles(2), TypeError));
