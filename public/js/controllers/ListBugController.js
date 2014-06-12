define(['app', 'underscore', 'factories/User', 'factories/Auth',  'factories/Application',  'factories/Environment',   'factories/Bug', 'services/Session'], function (mainApp, _) {
  mainApp.controller('ListBugController', ['$scope', '$rootScope', '$location', 'Application','Environment','Bug', function ($scope, $rootScope, $location, Application, Environment, Bug) {

    console.log('hola');

    Application.listAll()
      .then(function(data){
        $scope.applications = data;
      });
    Environment.listAll()
      .then(function(data){
        $scope.environments = data;
      });
    Bug.list()
        .then(function(res){
          $scope.bugs = res;
        });

    $scope.orderBy = 'name';


  }]);
});