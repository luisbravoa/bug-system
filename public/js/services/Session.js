define(['app'], function (mainApp) {
  mainApp.service('Session', function ($cookies) {
    this.create = function (data) {
      $cookies.user = JSON.stringify(data);
      this.user = data;
    };
    this.retrive = function(){
      var user = $cookies.user;
      this.user = angular.fromJson(user);
      return this.user;
    };
    this.destroy = function () {
      delete $cookies['user'];
    };
    return this;
  });
});