import test from 'ava';
import deplint from '../src/deplint';
import path from 'path';

test.skip('sorted-object', async t => {
  const _ = await deplint(path.resolve(__dirname, './fixtures/deplint/sorted-object/'));
  console.log(_);
  t.is(1, 1);
});
