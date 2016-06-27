/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import kit from 'es-dep-kit';

const _declProdModules = R.pipe(R.prop('dependencies'), R.keys);
const _declDevModules = R.pipe(R.prop('devDependencies'), R.keys);

const log = console.log; // eslint-disable-line

const _files = R.pipe(
  R.filter(kit.isResolved),
  R.filter(R.either(kit.isEntry, kit.isRequestedLocalFile)),
  R.map(kit._resolved)
);

const _modules = R.pipe(
  R.filter(kit.isRequestedPackage),
  R.map(kit._requested)
);

function computation([pkg, prodDeps, devDeps, _existingFiles]) {
  const pkgName = pkg.name;
  const prodFiles = _files(prodDeps);
  const devFiles = _files(devDeps);
  const prodModules = _modules(prodDeps);
  const devModules = _modules(devDeps);
  const declaredProdModules = _declProdModules(pkg);
  const declaredDevModules = _declDevModules(pkg);

  const files = {
    used: R.union(prodFiles, devFiles),
    existing: _existingFiles,
  };
  files.unused = R.difference(files.existing, files.used);

  const modules = {
    used: R.union(prodModules, devModules),
    declared: R.union(declaredProdModules, declaredDevModules),
  };
  modules.unused = R.difference(modules.declared, modules.used);

  return { pkgName, files, modules };
}

export default computation;
