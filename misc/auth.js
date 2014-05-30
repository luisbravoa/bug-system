var _ = require('underscore');

module.exports = function(req, res, next){
  var url = req.originalUrl;
  var method = req.originalMethod;
  var token = req.headers.token;

  var publicRoutes = {
    '/login': ['POST']
  };

  if(_.has(publicRoutes, url) && _.contains(publicRoutes[url], method)){
    return next();
  }

  if(!token){
    res.status(401);
    res.end();
  }

  global.models.User.forge({token: token})
    .fetch()
    .then(function(user){
      if(!user){
        res.send(401);
        res.end();
      }else{
        req.user = user;
        return next();
      }

    })
    .catch(function(){
      res.send(500);
      res.end();
    });
}