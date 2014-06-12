var when = require('when');
var uuid = require('node-uuid');
module.exports  = global.bookshelf.Model.extend({
  tableName: 'files',
  Bug: function () {
    return this.belongsTo(global.models.Bug, 'bug_id');
  },
  initialize: function() {
  }
});