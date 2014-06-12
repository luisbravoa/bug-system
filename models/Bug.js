var _ = require('underscore');
var when = require('when');
var uuid = require('node-uuid');
var utils = require('../misc/utils');
var fs = require('fs');

module.exports  = global.bookshelf.Model.extend({
  tableName: 'bugs',
  Files: function () {
    return this.hasMany(global.models.File, 'bug_id');
  },
  Environment: function () {
    return this.belongsTo(global.models.Environment, 'environment_id');
  },
  Application: function () {
    return this.belongsTo(global.models.Application, 'application_id');
  },
  add: function(data){
    var self = this;
    var files = data.screenshots;
    data = _.omit(data, 'screenshots');
    return self.set(data)
      .save()
      .then(function(model){
        return self.addImages(files);
      })
      .catch(function(e){
        return when.reject(e);
      });
  },
  addImages: function(files){
    var self = this;
    var deferred = when.defer();
    var filePromises = [];

    _.each(files, function(file){
      var fieldName = file.fieldName;
      var path = file.path;
      console.log(file.path);
      var promise = utils.moveFile(file.path, 'public/files/')
        .then(function(filePath){
          console.log(filePath);
          filePath = filePath.replace('public/', '');
          return self.related('Files').create({name: filePath}).yield(self);
        });
      filePromises.push(promise);
    });

    when.all(filePromises)
      .then(function(){
        console.log('buenis');
        deferred.resolve(self);
      })
      .catch(function(e){
        deferred.reject(e);
      });

    return deferred.promise;
  },
  deleteFile : function(id){
    var self = this;
    return self.related('Files').fetch()
      .then(function(files){
        var file = files.get(id);
        if(!file) return new Error('File Does not exist.');

        var path = "public/" + file.get('name');

        console.log(fs.existsSync(path));
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
        file.destroy();

        console.log(file);
        return when.resolve(self);
      });
  },
  search: function(options){
    var self = this;
    var total;
    var offset = 0;
    var page = (options.page)?options.page:1;
    var query = (options.query)?options.query:null;
    var limit = (options.limit)?options.limit:15;

    return self
      .query(function(qb) {
        if(query){
          qb.where('title', 'ILIKE', '%'+options.query);
        }
        qb.limit(options.limit).offset(30);
      })

  },

  initialize: function() {
  }
});