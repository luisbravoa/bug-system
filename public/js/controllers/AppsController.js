define(['app', 'factories/User', 'factories/Auth',  'factories/Application',  'factories/Environment',   'factories/Bug', 'services/Session'], function (mainApp) {
  mainApp.controller('AppsController', ['$scope', '$rootScope', '$location', 'Application','Environment','Bug', function ($scope, $rootScope, $location, Application, Environment, Bug) {

    $scope.formEnabled = true;
    Application.listAll()
      .then(function(data){
        $scope.applications = data;
      });




    $scope.resetSelected = function(){
      $scope.selected = {name:"", type:"mobile"};
    }

    $scope.resetSelected();

    $scope.editModal = function(app){
      $scope.selected = app;
      $('#myModal').modal();
      $('#myModal').on('hidden.bs.modal', function (e) {
        $scope.resetSelected();
      })
    }

    $scope.addModal = function(app){
      $scope.resetSelected();
      $('#myModal').modal();
      $('#myModal').on('hidden.bs.modal', function (e) {
        $scope.resetSelected();
      })
    }


    $scope.add = function(app){
      $scope.blockUI();
      Application.add(app)
        .then(function(res){
          $scope.unBlockUI();
          $scope.applications.push(res);
          $('#myModal').modal('hide');
        }, function(err){
          $scope.unBlockUI();
          $scope.error = err;
        });
    }



  }]);
});