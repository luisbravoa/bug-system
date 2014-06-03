define(['app'], function (mainApp) {
  mainApp.factory('Item', ['$resource', function ($resource) {
    return $resource('/item/:id', {id: '@id'});
  }]);
});