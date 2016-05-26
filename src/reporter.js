/* eslint-disable */
const log = console.log; // eslint-disable-line

function reporter(_) {
  log(`\`${_.pkgName}\` uses ${_.usedFiles.length} files out of ${_.existingFiles.length} existing`);
  log(`\`${_.pkgName}\` uses ${_.prodModules.length} prod modules out of ${_.declaredProdModules.length} declared`);
  log(`\`${_.pkgName}\` uses ${_.devModules.length} dev modules out of ${_.declaredDevModules.length} declared`);
  log('Unused Files:');
  log(_.unusedFiles.map(_ => `  ✗ ${_}`).join('\n'));
  log('Unused Prod Modules:');
  log(_.unusedProdModules.map(_ => `  ✗ ${_}`).join('\n'));
  log('Unused Dev Modules:');
  log(_.unusedDevModules.map(_ => `  ✗ ${_}`).join('\n'));
}

export default reporter;
