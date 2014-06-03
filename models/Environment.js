var when = require('when');
var uuid = require('node-uuid');
var User = global.bookshelf.Model.extend({
  tableName: 'environments',

  initialize: function() {
  }
});

module.exports = User;