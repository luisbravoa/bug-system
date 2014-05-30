var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

var utils = require('./misc/utils');
var auth = require('./misc/auth');


var Bookshelf = require('bookshelf');

global.bookshelf = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    filename : './db.sqlite3'
  }
});


global.models = require('./models/index').models;


// Routes

var users = require('./routes/users');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.use(allowCrossDomain);


var router = express.Router();

router.use(auth);
router.use(function(req, res, next){

  next();
});


router.get('/users', users.listAll);

router.post('/login', users.login);

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
app.use('/', router);
