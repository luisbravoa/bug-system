var _ = require('underscore');
var fs = require('fs');
var when = require('when');
var uuid = require('node-uuid');
var utils = require('../misc/utils');



exports.add = function(req, res){
  var data = req.body;
  data.screenshots = req.files;

  global.models.Bug.forge()
    .add(data)
    .then(function(bug){
      res.status(200);
      res.send(bug);
    })
    .catch(function(e){
      res.status(500);
      res.send(e.message);
    });
}


exports.addFiles = function(req, res){
  var id = req.params.id;
  var files = req.files;

  global.models.Bug.forge({id: id})
    .fetch()
    .then(function(bug){
      if(!bug) throw new Error('Bug does not exist.');

      return bug.addImages(files);
    })
    .then(function(bug){
      res.status(200);
      res.send(bug.relations.Files);
    })
    .catch(function(e){
      res.status(500);
      res.send(e.message);
    });
}


exports.listAll = function(req, res){
  global.models.Bug.collection().fetch({withRelated: ['Files', 'Application', 'Environment']})
    .then(function(bugs){
      res.send(bugs);
    })
    .catch(function(e){
      res.status(500);
      res.send(e);
    });
}
exports.getById = function(req, res){

  var id = req.params.id;

  global.models.Bug.forge({id: id})
    .fetch({withRelated: ['Files', 'Application', 'Environment']})
    .then(function(bug){
      res.send(bug);
    })
    .catch(function(e){
      res.status(500);
      res.send(e);
    });
}
exports.deleteFile = function(req, res){

  var id = req.params.id;
  var file_id = req.params.file_id;

  global.models.Bug.forge({id: id})
    .fetch()
    .then(function(bug){
      return bug.deleteFile(file_id)
    })
    .then(function(bug){
      res.send(bug);
    })
    .catch(function(e){
      res.status(500);
      res.send(e);
    });
}


exports.search = function(req, res){
  var options = {};
  options.query = req.body.query;
  options.page = req.body.page;
  options.limit = req.body.limit;

  global.models.Bug
    .forge()
    .search(options)
    .then(function(result){
      res.send(result);
      res.status(200);
      res.end();
    })
    .otherwise(function(err){
      res.status(401);
      res.send(err);
    });
}
