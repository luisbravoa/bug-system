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