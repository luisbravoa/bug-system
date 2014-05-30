
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