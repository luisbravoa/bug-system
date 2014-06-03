define(['app', 'angular', 'angularRoute', 'controllers/AppController', 'controllers/LoginController','controllers/AddBugController'], function(mainApp){
  mainApp.config(function($routeProvider,USER_ROLES) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/index.html',
        controller: 'AppController',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/bugs/add', {
        templateUrl: 'templates/addBug.html',
        controller: 'AddBugController',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/401', {
        templateUrl: 'templates/401.html',
        controller: 'AppController',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/allowed', {
        templateUrl: 'templates/allowed.html',
        controller: 'UserController',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/restricted', {
        templateUrl: 'templates/restricted.html',
        controller: 'UserController',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      });
    });
  });