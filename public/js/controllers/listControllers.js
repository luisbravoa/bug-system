define(['app', 'factories/item'], function (mainApp) {
  mainApp.controller('listCtrl', ['$scope', 'Item', function ($scope, Item) {
    $scope.items = Item.query();
  }]);
});