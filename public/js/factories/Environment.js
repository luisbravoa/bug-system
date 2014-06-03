define(['app'], function (mainApp) {
  mainApp.factory('Environment', ['$http', '$q',  function ($http, $q) {
    return {
      listAll: function(){
        var deferred = $q.defer();
        $http.get('/environments')
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