exports.listAll = function(req, res){
  global.models.Environment.collection().fetch()
    .then(function(environments){
      res.send(environments);
    })
    .catch(function(e){
      res.status(500);
      res.send(e);
  });
}