import pkgEsDeps from './pkg-es-deps';

pkgEsDeps('./package.json')
  .then(_ => _.map(item => item.resolved))
  .then(console.log)
  .catch(console.error);
