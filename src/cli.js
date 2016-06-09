import deplint from './deplint';
import reporter from './reporter';

deplint('./')
  .then(reporter)
  .catch(console.error); // eslint-disable-line
