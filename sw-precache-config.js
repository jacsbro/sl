module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ],
  stripPrefixMulti: {
    'bower_components/': 'sl/bower_components/',
    'src/': 'sl/src/'
  },
  navigateFallback: '/index.html'
};
