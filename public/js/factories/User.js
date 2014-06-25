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
      },
      signUp: function (credentials) {
        var deferred = $q.defer();

        $http
          .post('/users', credentials)
          .success(function (res) {
            deferred.resolve(res);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });
        return deferred.promise;
      }
    };
  }]);
});