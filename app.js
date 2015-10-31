// include packages
var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var bodyParser      = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//config cookieParser
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// include routes
var routes = require('./routes/routes')(app);

var http = require('http').Server(app);
http.listen(8080);

