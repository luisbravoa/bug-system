define(['app', 'underscore', 'factories/User', 'factories/Auth',  'factories/Application',  'factories/Environment',   'factories/Bug', 'services/Session'], function (mainApp, _) {
  mainApp.controller('SearchController', ['$scope', '$rootScope', '$location', '$cookies', 'Application','Environment','Bug', function ($scope, $rootScope, $location, $cookies, Application, Environment, Bug) {

    Application.listAll()
      .then(function(data){
        $scope.applications = data;
      });
    Environment.listAll()
      .then(function(data){
        $scope.environments = data;
      });

    $scope.page = 1;

    $scope.loading = false;

    $scope.bugs = [];

    $scope.searchRequest = function(){
      $scope.loading = true;
      Bug.search($scope.options)
        .then(function(res){
          $scope.bugs = res.data;
          $scope.pages = res.total_pages;
          $scope.page = res.page;
          $scope.limit = res.limit;
          $scope.paginator();
          $scope.loading = false;
        });
    }

    $scope.search = function(text, page){
      if(page == $scope.page && text == $scope.options.query) return;
      $scope.options.page = page;
      $scope.options.query = text;
      $cookies.searchOptions = JSON.stringify($scope.options);
      $scope.searchRequest();
    }


    if($cookies.searchOptions){
      $scope.options = angular.fromJson($cookies.searchOptions);
      $scope.searchRequest();
    }else{
      $scope.options = {};
      $scope.options.limit = 5;
      $scope.options.orderBy = 'id';
      $scope.options.orientation = 'DESC';
      $scope.options.query = null;
      $scope.options.page = 1;
      $scope.search(null, 1);
    }




    $scope.paginator = function(){
      var self = this;
      var currentPage = $scope.page;
      var totalPages = $scope.pages;
      var pageNav = [];

      if(currentPage > 1){
        pageNav.push({text: '<< Back', number: currentPage - 1, current: false});
      }

      for(var i=1;i <= totalPages;i++){
        if(i==currentPage){
            pageNav.push({text: currentPage, number: currentPage, current: true});
        }else{
          if(i >= currentPage - 4 && i < currentPage + 4 ){
            pageNav.push({text: i, number: i, current: false});
          }
        }
      }
      if(currentPage < totalPages){
        pageNav.push({text: 'Next >>', number: (currentPage + 1), current: false});
      }
      $scope.pageNav = pageNav;
    }

    $scope.orderBy = 'name';


  }]);
});