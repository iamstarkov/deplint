/* eslint-disable */
const log = console.log; // eslint-disable-line

// formatArr :: [String] -> String
const formatArr = arr => arr.map(_ => `  ✗ ${_}`).join('\n');

// reporter :: Object ->
function reporter({ pkgName, files, modules }) {
  log(`\`${pkgName}\` uses ${files.used.length} files out of ${files.existing.length} existing`);
  log(`\`${pkgName}\` uses ${modules.used.length} modules out of ${modules.declared.length} declared`);

  if (files.unused.length > 0) {
    log('Unused Files:');
    log(formatArr(files.unused));
  }
  if (modules.unused.length > 0) {
    log('Unused Modules:');
    log(formatArr(modules.unused));
  }

  const unused = [].concat(files.unused, modules.unused)
  const shouldFail = unused.length !== 0;

  if (shouldFail) {
    process.exitCode = 1;
  }
}

export default reporter;
