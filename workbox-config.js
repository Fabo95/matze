module.exports = {
  globDirectory: '.next',
  globPatterns: ['**/*.{json,html,css,woff2,ts}'],
  swDest: './public/sw.js',
  swSrc: 'src/serviceWorker/serviceWorkerBundled.js',
};
