define(['app'], function (mainApp) {
  mainApp.factory('Application', ['$http', '$q',  function ($http, $q) {
    return {
      listAll: function(){
        var deferred = $q.defer();
        $http.get('/applications')
          .success(function(res){
            deferred.resolve(res);
          })
          .error(function(data, status, headers, config){
            deferred.reject(status);
          });
        return deferred.promise;
      }
    };
  }]);
});