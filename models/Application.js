var when = require('when');
var uuid = require('node-uuid');
var User = global.bookshelf.Model.extend({
  tableName: 'applications',

  initialize: function() {
  }
});

module.exports = User;