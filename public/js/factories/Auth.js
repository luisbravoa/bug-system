define(['app', 'services/Session'], function (mainApp) {
  mainApp.factory('AuthService', function ($http, $q, Session) {
    return {
      login: function (credentials) {
        var deferred = $q.defer();
        var self = this;

        $http
          .post('/login', credentials)
          .success(function (res) {
            self.persistUser(res);
            deferred.resolve(res);
          })
          .error(function(data, status, headers, config) {
            deferred.reject(data);
          });
        return deferred.promise;
      },
      persistUser: function(data){
        Session.create(data);
      },
      logout: function () {
        var deferred = $q.defer();
        Session.destroy();
        deferred.resolve();
        return deferred.promise;
      },
      loggedUser: function(){
        return Session.retrive();
      },
      isAuthenticated: function () {
        return (Session.user && Session.user.id > 0);
      },
      isAuthorized: function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (this.isAuthenticated() &&
          (authorizedRoles.indexOf(Session.user.role) !== -1) ||
          authorizedRoles.indexOf('*') !== -1);
      }
    };
  })
});