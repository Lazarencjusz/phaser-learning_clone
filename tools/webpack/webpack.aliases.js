const { createWebpackAliases } = require('./webpack.helpers');

// Export aliases
module.exports = createWebpackAliases({
  '@assets': 'assets',
  '@common': 'src/common',
  '@main': 'src/main',
  '@app': 'src/app',
  '@src': 'src',
  '@misc': 'misc',
});
