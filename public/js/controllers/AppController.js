define(['app', 'factories/Auth'], function (mainApp) {
  mainApp.controller('AppController', function ($rootScope, $scope, $http, $location, USER_ROLES, AUTH_EVENTS, AuthService) {

    $scope.setTokenHeader = function(){
      $http.defaults.headers.common['token'] = $scope.currentUser.token;
    }

    $scope.currentUser = AuthService.loggedUser();
    if(!$scope.currentUser && $location.path() != '/login' && $location.path() != '/signup'){
      $location.path('/login');
    }else if($scope.currentUser){
      $scope.setTokenHeader();
    }

    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.$on(AUTH_EVENTS.notAuthenticated, function(){
      console.log('notAuthenticated');
      $location.path('login');
    });
    $scope.$on(AUTH_EVENTS.notAuthorized, function(){
      console.log('notAuthorized');
      $location.path('401');
    });

    $scope.$on(AUTH_EVENTS.loginSuccess, function(){
      $scope.currentUser = AuthService.loggedUser();
      $scope.setTokenHeader();
      $location.path('/');
    });
    $scope.$on(AUTH_EVENTS.logoutSuccess, function(){
      $scope.currentUser = null;
      $location.path('/login');
    });

    $scope.logout = function(){
      AuthService.logout()
        .then(function(){
          $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess)
        });
    }
  });
});