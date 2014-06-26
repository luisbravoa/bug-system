exports.listAll = function(req, res){
  global.models.Application.collection().fetch()
    .then(function(applications){
      res.send(applications);
    })
    .catch(function(e){
      res.status(500);
      res.send(e);
  });
}

exports.add = function(req, res){
  var data = req.body;
  data.user_id = req.user.id;

  global.models.Application.forge()
    .add(data)
    .then(function(bug){
      res.status(200);
      res.send(bug);
    })
    .catch(function(e){
      res.status(500);
      res.send(e);
    });
}
exports.edit = function(req, res){
  var data = req.body;
  var id = req.params.id;
  global.models.Application.forge()
    .edit(id,data)
    .then(function(bug){
      res.status(200);
      res.send(bug);
    })
    .catch(function(e){
      res.status(500);
      res.send(e);
    });
}