// Test file to verify module aliases work
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('App started successfully!');
console.log('Current directory:', __dirname);
console.log('Module aliases should be registered by my-aliases.mjs');

// You can test your aliases here once you set them up
// For example:
// import something from '@utils/something';
