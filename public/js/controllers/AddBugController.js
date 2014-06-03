define(['app', 'factories/User', 'factories/Auth',  'factories/Application',  'factories/Environment', 'services/Session'], function (mainApp, Session) {
  mainApp.controller('AddBugController', ['$scope', '$rootScope', '$location', 'Application','Environment', function ($scope, $rootScope, $location, Application, Environment) {

    Application.listAll()
      .then(function(data){
        $scope.applications = data;
      });
    Environment.listAll()
      .then(function(data){
        $scope.environments = data;
      });

    // FILES
    // https://egghead.io/lessons/angularjs-file-uploads

    $scope.newBug = {};
    $scope.errors = {};
    $scope.newBug.application_id = 1;
    $scope.newBug.environment_id = 1;
    $scope.newBug.country = 'AR';
    $scope.newBug.language = 'SPA';
    $scope.type = 'mobile';

    $scope.getType = function(){
      angular.forEach($scope.applications, function(v){
        if(v.id == $scope.newBug.application_id ){
          $scope.type = v.type;
        }
      });
    }

    $scope.addBug = function(){
      console.log($scope.newBug);
    }

  }]);
});