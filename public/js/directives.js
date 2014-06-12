'use strict';
define([ 'angular'], function (angular) {

/* Directives */

  angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    }
  }])
  .directive('fileInput', ['$parse'], function($parse){
    return {
      restrict: 'A',
      link: function(scope, elm, attrs){
        elm.bind('change', function(){
          console.log('aqui');
          $parse(attrs, fileinput)
            .assign(scope, elm[0].files);
          $scope.$apply();
        });
      }
    };
  });

});
