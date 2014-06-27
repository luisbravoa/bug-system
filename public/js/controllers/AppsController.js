define(['app', 'factories/User', 'factories/Auth',  'factories/Application',  'factories/Environment',   'factories/Bug', 'services/Session'], function (mainApp) {
  mainApp.controller('AppsController', ['$scope', '$rootScope', '$location', 'Application','Environment','Bug', function ($scope, $rootScope, $location, Application, Environment, Bug) {

    $scope.formEnabled = true;
    Application.listAll()
      .then(function(data){
        $scope.applications = data;
      });


    $scope.process = function(bug){
      $scope.blockUI();
      Bug.add(bug)
        .then(function(){
          $scope.unBlockUI();
          $location.path('/bugs/list');
        });
    }
    $scope.selected = {name:"", type:"mobile"}

    $scope.edit = function(app){
      $scope.selected = app;
      $('#myModal').modal();
      $('#myModal').on('hidden.bs.modal', function (e) {
        $scope.selected = {name:"", type:"mobile"};
      })
    }



  }]);
});