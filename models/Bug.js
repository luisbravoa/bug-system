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
    var search = (options.query)?options.query.toLowerCase():null;
    var limit = (options.limit)?options.limit:15;
    var orderBy = (options.orderBy)?options.orderBy:'id';
    var orientation = (options.orientation)?options.orientation:'DESC';



    var query = "select count(*) from bugs ";



    if(search !== null){
      var termArray = search.split(" ");
      var where = "title LIKE '%" + search + "' OR description LIKE '%" + search + "' ";
      for (var i = 0; i < termArray.length; i++) {
        if (termArray[i].length > 1) {
          where += "OR title LIKE '%" + termArray[i] + "%' OR description LIKE '%" + termArray[i] + "%' ";
        }
      }
      query += "where " + where;
    }else{
      where = '';
    }



    return global.bookshelf.knex.raw(query)
      .then(function(result){
        total = result[0][0]['count(*)'];
        if(limit == 0 ){
          total_pages = 1;
        }else{
          total_pages = Math.ceil(total / limit);
          offset = (page - 1) * limit;
        }
        return when.resolve(self);
      })
      .then(function(){
        try{
          return global.models.Bug.collection()
            .query(function(qb) {
              if(search){
                qb.whereRaw(where);
              }
              qb.limit(options.limit).offset(offset).orderBy(orderBy, orientation);
            })
            .fetch({withRelated: ['Files', 'Application', 'Environment']})
        }catch (e){
          console.log(e);
        }

      })

      .then(function(data){

        var response = {};
        response.total_pages = total_pages;
        response.page = page;
        response.limit = limit;
        response.data = data;
        return when.resolve(response);
      });

  },

  initialize: function() {
  }
});