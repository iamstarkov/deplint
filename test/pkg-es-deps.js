import test from 'ava';
import pkgEsDeps from '../src/pkg-es-deps';
import { mock as depMock } from 'es-dep-unit';

test('basic', async t => {
  const _ = await pkgEsDeps('./fixtures/pkg-es-deps/package.json');
  const dep = depMock(['fixtures', 'pkg-es-deps']);
  t.deepEqual(_[0], dep(null, null, './main.js'));
  t.deepEqual(_[1], dep('./a.js', './main.js', './a.js'));
  t.deepEqual(_[2], dep('./b.js', './main.js', './b.js'));
  t.is(_.length, 3);
});

test('unresolvable', t => t.throws(pkgEsDeps(), TypeError));
test('invalid input', t => t.throws(pkgEsDeps(2), TypeError));
test('invalid input', t => t.throws(pkgEsDeps(2), TypeError));
