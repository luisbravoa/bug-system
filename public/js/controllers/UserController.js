define(['app', 'factories/User', 'factories/Auth', 'services/Session'], function (mainApp, Session) {
  mainApp.controller('UserController', ['$scope', '$rootScope', 'User', 'USER_ROLES', 'AUTH_EVENTS', 'AuthService', function ($scope, $rootScope, User, USER_ROLES, AUTH_EVENTS, AuthService) {

    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
  }]);
});