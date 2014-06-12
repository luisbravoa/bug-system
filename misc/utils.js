var when = require('when');
var _ = require('underscore');
var fs = require('fs');
Date.prototype.parse = function(){
  //  yyyy-MM-dd HH:mm:ss
  dformat = [this.getDate(),
    this.getMonth()+1,
    this.getFullYear()].join('-')+
    ' ' +
    [this.getHours(),
      this.getMinutes(),
      this.getSeconds()].join(':');
  return dformat;
}

var utils = {};


utils.moveFile = function (sourcePath, destPath){
  var deferred = when.defer();
  var source = fs.createReadStream(sourcePath);

  var filename = sourcePath.split("/").pop();
  destPath += filename;

  var dest = fs.createWriteStream(destPath);



  source.pipe(dest);
  source.on('end', function() {
    deferred.resolve(destPath);
  });
  source.on('error', function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
}
module.exports = utils;