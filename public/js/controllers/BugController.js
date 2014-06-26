define(['app', 'jQuery', 'underscore', 'factories/User', 'factories/Auth',  'factories/Application',  'factories/Environment',   'factories/Bug', 'services/Session'], function (mainApp , $ , _) {
  mainApp.controller('BugController', ['$scope', '$rootScope', '$location', '$routeParams', 'Application','Environment','Bug', function ($scope, $rootScope, $location, $routeParams, Application, Environment, Bug) {

    $scope.id = $routeParams.id;
    $scope.screenshots = null;

    $scope.loadingFiles = false;

    Application.listAll()
      .then(function(data){
        $scope.applications = data;
      });
    Environment.listAll()
      .then(function(data){
        $scope.environments = data;
      });
    Bug.fetch($scope.id)
        .then(function(res){
          $scope.bug = res;
        $scope.getType();
        });

    $scope.showFile = function(file){
      $scope.currentFile = file;
      $('#myModal').modal();
      $('#myModal').on('hidden.bs.modal', function (e) {
        $scope.currentFile = null;
      })
    }

    $scope.deleteFile = function(file){
      console.log(file);
      Bug.deleteFile(file)
        .then(function(){
          console.log('deleted');
          $scope.bug.Files = _.reject($scope.bug.Files, _.matches({id: file.id}));
          delete file;
        });
    }

    $scope.addFiles = function(screenshots){
//      $scope.loadingFiles = true;
      $scope.blockUI();
      Bug.addFiles($scope.id , screenshots)
        .then(function(files){
          angular.forEach(
            angular.element("input[type='file']"),
            function(inputElem) {
              angular.element(inputElem).val(null);
            });
          $scope.screenshots = null;
          console.log('BIENNNNNNNNNN', files);
          $scope.bug.Files = $scope.bug.Files.concat(files);
//          $scope.loadingFiles = false;
          $scope.unBlockUI();
        });
      console.log(screenshots);
    }


    $scope.$watch('screenshots', function() {
      console.log($scope.screenshots);
      if(!$scope.screenshots || $scope.screenshots.length == 0){
        console.log($scope.screenshots);
        return;
      }
      console.log($scope.screenshots);
      $scope.addFiles($scope.screenshots);

    });

    $scope.getType = function(){
      angular.forEach($scope.applications, function(v){
        if(v.id == $scope.bug.application_id ){
          $scope.type = v.type;
        }
      });
    }

    $scope.getType();
    $scope.formEnabled = false;

    $scope.orderBy = 'name';

    $scope.process = function(bug){
      console.log(bug);
      $scope.blockUI();
      Bug.edit(bug)
        .then(function(res){
          $scope.bug = res;
          $scope.getType();
          $scope.formEnabled = false;
          $scope.unBlockUI();
        },
      function(err){
        console.log(err);
      });
    }

  }]);
});