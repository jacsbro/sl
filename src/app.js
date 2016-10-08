/* somewhat global functions */
(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // array of mezas loaded by ajax call
  app.handleMezaResponse = function(data) {
    app.mezas = data.detail.response;
    app.finishedLoading();
    console.log('loaded ' + app.mezas.length + ' mezas');
  }


  // Sets app default base URL
  app.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    // console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });


  //////////////////////////////////////////////////////////////////////////////
  // Polyfills

  // Add a polyfill for Array.find - @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  };

  // load startsWith polyfill - https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }

  //////////////////////////////////////////////////////////////////////////////
  // I18N helper functions

  /**
  * load translations for element.
  *
  */
  app.I18NloadResources = function(elem) {
    elem.loadResources(elem.resolveUrl('../i18n/locales.json'));
  };

  /**
  * set language for element
  */
  app.I18NsetLang = function(elem) {
    elem.language = app.language;
  };

  /**
  * register the element in the i18n elements
  */
  app.I18Nregister = function(elem) {
    if (!app.I18Nelements) {
      app._I18Ninit(elem);
      return;
    }
    app.I18NloadResources(elem);
    app.I18NsetLang(elem);
    app.I18Nelements.push(elem);
  };

  /**
  * register the element in the i18n elements
  */
  app.I18Ntoggle = function(newLang) {
    app.language = newLang;
    for (var i = 0; i < app.I18Nelements.length; i++) {
      app.I18NsetLang(app.I18Nelements[i]);
    }
  };

  /**
  * initialize I18N for the application
  */
  app._I18Ninit = function(elem) {
    if (app.I18Nelements && app.I18Nelements.length > 0) {
      console.error('I18Ninit() was already called - did you mean to I18Nregister() instead?');
    }
    var theLang = navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage;
    app.language = theLang.startsWith('de') ? 'de' : 'en';
    app.I18Nelements = [];
    app.I18Nregister(elem);
  };

  //////////////////////////////////////////////////////////////////////////////
  // Helper functions
  app.toDate = function(date) {
    if (date && !(date instanceof Date)) {
      var theDateMillies = Date.parse(date);
      if (theDateMillies && theDateMillies !== NaN) {
        date = new Date(theDateMillies);
      }
    }
    if (date && date instanceof Date) {
      return date.toLocaleDateString(app.language);
    }
    return "";
  }

  app.toBoolean = function(bool) {
    if (bool === undefined || bool == false ) { // == is ok for boolean and Boolean
      return new Boolean(false);
    }
    return new Boolean(true);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Global application state

  // holds the current page
  app.page = 'view1';
  app.setPage = function(aPage) {
    app.page = aPage;
  }

  // changes route to detail view
  app.setDetailView = function(mode, aList,aSlstore) {
    app.detailViewData = {
      currentListMode: mode,
      currentList: aList,
      slstore: aSlstore
    };
    app.set('route.path', '/detailview');
  }

  // changes route to main view
  app.setMainView = function() {
    app.set('route.path', '/view1');
    app.$.myapp_mainview.refresh();
  }

  // changes route to sync view
  app.setSyncView = function() {
    app.set('route.path', '/syncview');
  }

  // sets the syncicon
  app.syncicon = 'sync-problem';
  app.setSyncicon = function(aSyncicon) {
    app.syncicon = aSyncicon;
  }

  // firebase user
  app.getFirebaseUid = function() {
    if (app.firebaseUser) {
      return app.firebaseUser.uid;
    }
    return null;
  }

  // get internal storage
  app.getInternal = function() {
    return app.$.myapp_mainview.$.myapp_sl.internal;
  }

  // update firebase from internal
  app.updateFirebase  = function() {
    var uid = app.getFirebaseUid();
    var doc = app.getInternal();
    if (doc && uid) {
      firebase.database().ref('users/' + uid).set(doc);
    }

  }
})(document);
