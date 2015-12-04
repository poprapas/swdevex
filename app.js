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
app.use(cookieParser( "secret", {"path": "/"} ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// create and run web application on port 8080 
var http = require('http').Server(app);

// include routes
var routes = require('./routes')(app);

 // catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
});

http.listen(8080);

