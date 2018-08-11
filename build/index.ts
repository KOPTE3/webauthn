import 'core-js';
import 'reflect-metadata';


import * as path from 'path';
import gen from '../tasks/gen';


gen({root: path.resolve(__dirname, '..', 'element')})
	.catch(console.error);
