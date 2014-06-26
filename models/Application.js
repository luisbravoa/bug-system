var when = require('when');
var Checkit = require('checkit');
var _ = require('underscore');

var typeValidator = function(value){
  if(value !== 'mobile' && value !== 'web' && value !== 'server'){
    throw new Error('Invalid application type');
  }
};
var Application = global.bookshelf.Model.extend({
  tableName: 'applications',

  initialize: function() {
  },
  validations: {
    name: ['required', 'minLength:3', 'maxLength:25'],
    type: ['required', typeValidator],
    user_id: ['integer']

  },
  add: function(data){
    var self = this;
    var checkit = new Checkit(self.validations);
    return checkit.run(data)
      .then(function(){
        return self.set(data)
          .save()
          .then(function(model){
            return when.resolve(self);
          })
      })
      .catch(function(e){
        return when.reject(e);
      });
  },
  edit: function(id, data){
    var self = this;
    var checkit = new Checkit(self.validations);
    var data = _.omit(data, ['id', 'user_id']);

    return self.set({id: id})
      .fetch()
      .then(function(app){
        if(!app){
          return when.reject(new Error('App does not exists.'));
        }
        self.set(data);
        return checkit.run(self.toJSON())

      })
      .then(function(){
        return self.save()
          .then(function(model){
            return when.resolve(self);
          })
      })
      .catch(function(e){
        return when.reject(e);
      });
  }
});

module.exports = Application;