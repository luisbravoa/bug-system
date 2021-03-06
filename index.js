var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var utils = require('./misc/utils');
var auth = require('./misc/auth');
var config = require('./config');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'



var Bookshelf = require('bookshelf');
Bookshelf.PG = Bookshelf.initialize({
    client: 'pg',
    connection: {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        charset: 'utf8'
    }
});
global.bookshelf = require('bookshelf').PG;

var Bookshelf = require('bookshelf');

//global.bookshelf = Bookshelf.initialize({
//  client: 'sqlite3',
//  connection: {
//    filename : './db.sqlite3'
//  }
//});


global.models = require('./models/index').models;


// Routes

var users = require('./routes/users');
var applications = require('./routes/applications');
var environments = require('./routes/environments');
var bugs = require('./routes/bugs');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}


app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.use(allowCrossDomain);


var router = express.Router();

router.use(express.static(__dirname + '/public'));
router.get('/test', function(rqe, res){
    var bug = {
        "id": 1,
        "application_id": 9,
        "environment_id": 2,
        "country": "AR",
        "language": "SPA",
        "os": "Windows",
        "os_version": "7",
        "application_version": null,
        "title": "No puedo entrar.",
        "description": "No puedo entrar a la aplicacion.",
        "steps": null,
        "booking_id": null,
        "user_id": null,
        "driver_id": null,
        "browser": "chrome",
        "browser_version": "x",
        "created": null,
        "Environment": {
            "id": 2,
            "name": "Testing"
        },
        "Files": [
            {
                "id": 1,
                "name": "files/4105-1icqtg5.png",
                "bug_id": 1
            },
            {
                "id": 2,
                "name": "files/4335-1n5jm6m.jpg",
                "bug_id": 1
            }
        ],
        "Application": {
            "id": 9,
            "name": "Corporate Portal",
            "type": "web"
        }
    };

    res.send(bug);
});

router.use(auth);
router.use(function(req, res, next){

  next();
});


router.get('/users', users.listAll);
router.post('/users', users.signUp);
router.get('/applications', applications.listAll);
router.get('/environments', environments.listAll);

router.post('/login', users.login);
router.get('/bugs', bugs.listAll);
router.get('/bugs/:id', bugs.getById);
router.post('/bugs/search', bugs.search);
router.delete('/bugs/:id/files/:file_id', bugs.deleteFile);
router.post('/bugs/:id/files', multipartMiddleware, bugs.addFiles);
router.post('/bugs', multipartMiddleware, bugs.add);
router.post('/bugs/:id', bugs.edit);

router.post('/applications', applications.add);
router.put('/applications/:id', applications.edit);

var server = app.listen(server_port, server_ip_address, function() {
  console.log('Listening on port %d', server.address().port);
});
app.use('/', router);
