var when = require('when');
var uuid = require('node-uuid');
var Checkit = require('checkit');
var config = require("../config");
var crypto = require('crypto');


emailInUseValidator = function(val) {
  return global.bookshelf.knex("users").where("email", '=', val).then(function(resp) {
    if (resp.length > 0) {
      throw new Error('Email is already in use.');
    }
  });
}

var User = global.bookshelf.Model.extend({
  tableName: 'users',

  defaults: {
    "created": new Date(),
    "modified": new Date()
  },

  initialize: function() {
    var self = this;
  },
  validations: {
    name: ['required', 'minLength:3', 'maxLength:25'],
    email: ['required', 'email', emailInUseValidator],
    password:['required', 'minLength:6', 'maxLength:15']
  },
  hash: function (string) {
    var shasum = crypto.createHash('sha1');
    shasum.update(config.security.salt + string, 'ascii');
    return shasum.digest('hex');
  },
  login: function(email, password){
    var self = this;
    if(!email || !password){
      return when.reject(new Error('Email and password are required'));
    }
    password = self.hash(password);

    return self.set({email: email, password: password})
      .fetch()
      .then(function(user){
        if(!user) {
          return when.reject(new Error('Login Failed'));
        }
        var token = uuid.v1();
        return user.set('token', token)
          .save()
          .then(function(user){
            return when.resolve(user);
          });
      });
  },
  signUp: function(data){
    var self = this;
    var deferred = when.defer();

    var checkit = new Checkit(self.validations);

    checkit.run(data).then(function(validated) {
      data.password = self.hash(data.password);
      data.token = uuid.v1();
      return self.set(data)
        .save()
        .then(function(user){
          deferred.resolve(user);
        });
    }).catch(Checkit.Error, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;

  }

});


module.exports = User;