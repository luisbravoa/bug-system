require.config({
  baseUrl: '/js',
  paths: {
    'jQuery': '../bower_components/jquery/dist/jquery',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'angular': '../bower_components/angular/angular',
    'angularRoute': '../bower_components/angular-route/angular-route',
    'angularResource': '../bower_components/angular-resource/angular-resource',
    'angularCookies': 'lib/angular-cookies',
    'underscore': '../bower_components/underscore/underscore'
  },
  shim: {
    'angular': {'exports': 'angular'},
    'angularRoute': {
      'deps': ['angular']
    },
    'angularCookies': {
      'deps': ['angular']
    },
    'angularResource': {
      'deps': ['angular']
    },
    'jQuery': {'exports' : 'jQuery'},
    underscore: {
      exports: '_'
    },
    "bootstrap": ["jQuery"]
  }
});

require(['main']);