/* eslint-disable */
const log = console.log; // eslint-disable-line

function reporter({ pkgName, files, modules }) {
  log(`\`${pkgName}\` uses ${files.used.length} files out of ${files.existing.length} existing`);
  log(`\`${pkgName}\` uses ${modules.used.length} modules out of ${modules.declared.length} declared`);

  if (files.unused.length > 0) {
    log('Unused Files:');
    log(files.unused.map(_ => `  ✗ ${_}`).join('\n'));
  }
  if (modules.unused.length > 0) {
    log('Unused Modules:');
    log(modules.unused.map(_ => `  ✗ ${_}`).join('\n'));
  }
}

export default reporter;
