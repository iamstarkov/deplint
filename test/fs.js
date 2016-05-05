import test from 'ava';
import { allFiles, testFiles } from '../src/fs';

const expected = [
  'index.js',
  'lost-unicorn.js',
  'nested/yo.js',
  'q.json',
];

test('fs', async t => {
  const _ = await allFiles('./fixtures/fs');
  t.deepEqual(_, expected);
});

test('empty input', t => t.throws(allFiles(), TypeError));
test('invalid input', t => t.throws(allFiles(2), TypeError));
