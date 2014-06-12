define(['angular', 'angularResource', 'angularRoute', 'angularCookies'], function (angular) {


  return angular.module('mainApp', ['ngResource', 'ngRoute', 'ngCookies'])
    .constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
      all: '*',
      admin: 'admin',
      user: 'user',
      guest: 'guest'
    })
    .run(function ($rootScope,  AUTH_EVENTS, AuthService) {
      $rootScope.$on('$routeChangeStart', function(event, next, current) {

        if(!next.$$route.data) return;

        var authorizedRoles = next.$$route.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (AuthService.isAuthenticated()) {
            // user is not allowed
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            // user is not logged in
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
      });
    })
    .directive('fileInput', ['$parse', function($parse){
      return {
        restrict: 'A',
        link: function(scope, elm, attrs){
          elm.bind('change', function(){
            $parse(attrs.fileInput)
              .assign(scope, elm[0].files);
            scope.$apply();
          });
        }
      };
    }])
    .filter('truncate', function () {
      return function (text, length, end) {
        if (isNaN(length))
          length = 10;

        if (end === undefined)
          end = "...";

        if (text.length <= length || text.length - end.length <= length) {
          return text;
        }
        else {
          return String(text).substring(0, length-end.length) + end;
        }

      };
    });
  ;

});