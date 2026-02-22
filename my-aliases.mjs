import { addAlias, addAliases } from 'module-alias';

addAlias('@utils', process.cwd() + '/src/utils');
// or
addAliases({
  '@utils': process.cwd() + '/src/utils',
  '@lib': process.cwd() + '/src/lib',
});

// Custom handler function
addAlias('@src', (fromPath, request, alias) => {
  // fromPath - Full path of the file from which `import` was called
  // request - The path that was passed into `import` (e.g. '@src/utils.js')
  // alias - The alias being matched (`@src` in this case)
  const subpath = request.slice(alias.length); // e.g. '/utils.js'
  const base = fromPath.includes('/tests/') ? '/mocks' : '/src';
  return process.cwd() + base + subpath;
});
