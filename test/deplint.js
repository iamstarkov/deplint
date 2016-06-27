import test from 'ava';
import deplint from '../src/deplint';
import path from 'path';

const preFixtures = fixturesPath => _ => path.join(process.cwd(), fixturesPath, _);

test('sorted-object', async t => {
  const preSortedObject = preFixtures('./fixtures/deplint/sorted-object/');
  const actual = await deplint(path.resolve(__dirname, './fixtures/deplint/sorted-object/'));
  const expected = {
    files: {
      existing: [
        './extra.js',
        './lib/sorted-object.js',
        './test/tests.js',
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
        'jshint',
      ],
      unused: [
        'es-dep-kit',
        'es-dep-unit',
        'es-deps-deep',
        'globby',
      ],
    },
  };

  t.deepEqual(actual.files.existing,   expected.files.existing);
  t.deepEqual(actual.files.used,       expected.files.used);
  t.deepEqual(actual.files.unused,     expected.files.unused);

  t.deepEqual(actual.modules.declared, expected.modules.declared);
  // @todo
  // t.deepEqual(actual.modules.used,     expected.modules.used);
  // t.deepEqual(actual.modules.unused,   expected.modules.unused);
});
