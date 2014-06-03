define(['app'], function (mainApp) {
  mainApp.factory('User', ['$http', '$q', function ($http, $q) {
    return {
      listAll: function(){
        var deferred = $q.defer();
        $http.get('/applications')
          .success(function(res){
            deferred.resolve(res);
          })
          .error(function(e){
            deferred.reject(e);
          });
        return deferred.promise;
      }
    };
  }]);
});