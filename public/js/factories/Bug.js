define(['app'], function (mainApp) {
  mainApp.factory('Bug', ['$http', '$q', function ($http, $q) {
    return {
      fetch : function(id){
        var deferred = $q.defer();
        $http.get('/bugs/' + id)
          .success(function (res) {
            deferred.resolve(res);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });
        return deferred.promise;
      },
      list : function(){
        var deferred = $q.defer();
        $http.get('/bugs')
          .success(function (res) {
            deferred.resolve(res);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });
        return deferred.promise;
      },
      search : function(options){
        var deferred = $q.defer();
        $http.post('/bugs/search', options)
          .success(function (res) {
            deferred.resolve(res);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });
        return deferred.promise;
      },
      add: function (data) {
        var deferred = $q.defer();
        var ops = {
          headers: {'Content-Type': undefined},
          transformRequest: angular.identity
        };
        var fd = new FormData();
        angular.forEach(data, function(value, key){
          if(key == 'screenshots'){
            return
          }else{
            fd.append(key, value);
          }
        });
        angular.forEach(data.screenshots, function(value, key){
          fd.append(key, value);
        });

        $http
          .post('/bugs', fd, ops)
          .success(function (res) {
            deferred.resolve(res);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });
        return deferred.promise;
      },
      edit: function (data) {
        var deferred = $q.defer();
        var id = data.id;
        delete data.Files;
        delete data.Application;
        delete data.Environment;

        $http
          .post('/bugs/' + id, data)
          .success(function (res) {
            deferred.resolve(res);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });
        return deferred.promise;
      },
      addFiles: function (id, data) {
        var deferred = $q.defer();
        var ops = {
          headers: {'Content-Type': undefined},
          transformRequest: angular.identity
        };
        var fd = new FormData();
        angular.forEach(data, function(value, key){
          fd.append(key, value);
        });


        $http
          .post('/bugs/' + id + '/files', fd, ops)
          .success(function (res) {
            deferred.resolve(res);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });
        return deferred.promise;
      },
      deleteFile: function(file){
        var deferred = $q.defer();
        $http.delete('/bugs/' + file.bug_id + '/files/' + file.id)
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