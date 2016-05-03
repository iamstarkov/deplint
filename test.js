import test from 'ava';
import { deplint, deplintAsync } from './index';

test('basic', t => t.is(
  deplint('unicorns'),
  'unicorns'
));

test('empty input', t => t.throws(() => { deplint(); }, TypeError));
test('invalid input', t => t.throws(() => { deplint(2); }, TypeError));

test('async :: basic', async t => t.is(
  await deplintAsync('unicorns'),
  'unicorns'
));

test('async :: empty input', t => t.throws(deplintAsync(), TypeError));
test('async :: invalid input', t => t.throws(deplintAsync(2), TypeError));
