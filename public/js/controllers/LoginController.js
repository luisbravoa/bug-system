define(['app', 'factories/User', 'factories/Auth', 'services/Session'], function (mainApp, Session) {
  mainApp.controller('LoginController', ['$scope', '$rootScope', '$location', 'User', 'USER_ROLES', 'AUTH_EVENTS', 'AuthService', function ($scope, $rootScope, $location, User, USER_ROLES, AUTH_EVENTS, AuthService) {

    if($scope.currentUser){
      $location.path('/');
    }

    $scope.credentials = {
      email: 'info@luisbravoa.com',
      password: '123456'
    };

    $scope.login = function (credentials) {
      $scope.blockUI();
      $scope.loginError = null;
      AuthService.login(credentials).then(function () {
        $scope.unBlockUI();
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function (err) {
        $scope.loginError = err;
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        $scope.unBlockUI();
      });
    };
  }]);
});