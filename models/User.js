var when = require('when');
var uuid = require('node-uuid');
var User = global.bookshelf.Model.extend({
  tableName: 'users',

  initialize: function() {
  },
  login: function(email, password){
    var self = this;
    if(!email || !password){
      return when.reject(new Error('Email and password are required'));
    }
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
  }
});

module.exports = User;