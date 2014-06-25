define(['app', 'factories/User', 'factories/Auth', 'services/Session'], function (mainApp, Session) {
  mainApp.controller('SignUpController', ['$scope', '$rootScope', '$location', 'User', 'USER_ROLES', 'AUTH_EVENTS', 'AuthService', function ($scope, $rootScope, $location, User, USER_ROLES, AUTH_EVENTS, AuthService) {

    if($scope.currentUser){
      $location.path('/');
    }

    $scope.credentials = {};

    $scope.signUp = function () {
      if($scope.credentials.password !== $scope.credentials.password2){
        $scope.error = "Passwords do not match";
        return;
      }
      $scope.error = null;
      User.signUp($scope.credentials).then(function (res) {
        console.log('success >> ', res)
        AuthService.persistUser(res);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function (err) {
        $scope.error = err;
        console.log('error >> ', err)
      });
    };
  }]);
});