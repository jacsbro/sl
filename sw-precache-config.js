module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ],
  // adding sl prefix to all urls cause we have deployed it beneath this context.
  // gotcha: stripPrefixMulti seem to be ignored by the version of sw-precache polymer uses
  replacePrefix: '/sl',
  navigateFallback: '/index.html'
};
