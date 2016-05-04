import test from 'ava';
import fs from '../src/fs';

const expected = [
  'index.js',
  'lost-unicorn.js',
  'nested/yo.js',
  'q.json',
];

test('fs', async t => {
  const _ = await fs('./fixtures/fs');
  t.deepEqual(_, expected);
});

test('empty input', t => t.throws(fs(), TypeError));
test('invalid input', t => t.throws(fs(2), TypeError));
