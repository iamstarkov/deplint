import test from 'ava';
import deplint from '../src/deplint';
import path from 'path';

const preFixtures = fixturesPath => _ => path.join(process.cwd(), fixturesPath, _);

test('sorted-object', async t => {
  const preSortedObject = preFixtures('./fixtures/deplint/sorted-object/');
  const _ = await deplint(path.resolve(__dirname, './fixtures/deplint/sorted-object/'));
  const expected = {
    files: {
      existing: [
        './lib/sorted-object.js',
        './test/tests.js',
        './extra.js',
      ].map(preSortedObject),
      used: [
        './lib/sorted-object.js',
        './test/tests.js',
      ].map(preSortedObject),
      unused: [
        './extra.js',
      ].map(preSortedObject),
    },
    modules: {
      declared: [
        'es-dep-kit',
        'es-dep-unit',
        'es-deps-deep',
        'globby',
        'jshint',
        'tape',
      ],
      used: [
        'tape',
      ],
      unused: [
        'es-dep-kit',
        'es-dep-unit',
        'es-deps-deep',
        'globby',
      ],
    },
  };

  t.deepEqual(_, expected);
});
