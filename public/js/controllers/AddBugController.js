define(['app', 'factories/User', 'factories/Auth',  'factories/Application',  'factories/Environment',   'factories/Bug', 'services/Session'], function (mainApp) {
  mainApp.controller('AddBugController', ['$scope', '$rootScope', '$location', 'Application','Environment','Bug', function ($scope, $rootScope, $location, Application, Environment, Bug) {

    $scope.formEnabled = true;
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

    $scope.bug = {};
    $scope.errors = {};
    $scope.bug.application_id = 1;
    $scope.bug.environment_id = 1;
    $scope.bug.country = 'AR';
    $scope.bug.language = 'SPA';
    $scope.type = 'mobile';

    $scope.getType = function(){
      angular.forEach($scope.applications, function(v){
        if(v.id == $scope.bug.application_id ){
          $scope.type = v.type;
        }
      });
    }

    $scope.process = function(bug){
      $scope.blockUI();
      Bug.add(bug)
        .then(function(){
          $scope.unBlockUI();
          $location.path('/bugs/list');
        });
    }




  }]);
});