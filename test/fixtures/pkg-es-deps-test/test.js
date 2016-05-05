import deplintTest from 'deplint-test';
import index from './index.js';

deplintTest('yo', t => t.is('index', index));
