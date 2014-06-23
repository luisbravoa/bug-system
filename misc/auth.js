var _ = require('underscore');

module.exports = function(req, res, next){
  var url = req.originalUrl;
  var method = req.originalMethod;
  var token = req.headers.token;

//  var jsFolder = new RegExp("(/js/).*");
//
//  var publicFolders = ["(/js/).*", "(/img/).*", "(/templates/).*", "/favicon.ico", "/index.html"];
//  var isPublicFolder = false;
//
//  _.each(publicFolders, function(v, i){
//    if(new RegExp(v).test(url)){
//      isPublicFolder = true;
//    }
//  });
//
//  if(isPublicFolder === true){
//    return next();
//  }

  var publicRoutes = {
    '/login': ['POST'],
    '/users': ['POST']
  };

  if(_.has(publicRoutes, url) && _.contains(publicRoutes[url], method)){
    return next();
  }

  if(!token){
    res.status(401);
    res.end();
    return;
  }

  global.models.User.forge({token: token})
    .fetch()
    .then(function(user){
      if(!user){
        res.send(401);
        res.end();
        return;
      }else{
        req.user = user;
        return next();
      }

    })
    .catch(function(e){
      res.send(500);
      res.end();
      return;
    });
}