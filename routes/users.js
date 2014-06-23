exports.listAll = function(req, res){
  global.models.User.collection().fetch()
    .then(function(users){
      res.send(users);
    })
    .catch(function(e){
      res.status(500);
      res.send('hola');
  });
}

exports.login = function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  global.models.User.forge()
    .login(email, password)
    .then(function(user){
      res.status(200);
      res.send(user);
    })
    .catch(function(e){
      res.status(500);
      res.send(e.message);
    });
}
exports.signUp = function(req, res){
  var data = {};
  data.email = req.body.email;
  data.password = req.body.password;
  data.name = req.body.name;


  global.models.User.forge()
    .signUp(data)
    .then(function(user){
      res.status(200);
      res.send(user);
    })
    .catch(function(e){
      res.status(500);
      res.send(e);
    });
}