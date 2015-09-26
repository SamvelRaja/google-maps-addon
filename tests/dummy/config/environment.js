/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    /*
    Need to include this after a deep study
    and should include "ember-cli-content-security-policy": "0.4.0", in package.json
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' www.storage.googleapis.com www.maps.googleapis.com",
      'font-src': "'self' www.fonts.googleapis.com www.maps.googleapis.com",
      'connect-src': "'self'",
      'img-src': "'self' www.gravatar.com www.maps.googleapis.com",
      'style-src': "'self' www.fonts.googleapis.com www.storage.googleapis.com",
      'media-src': "'self'"
    },
    */
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
