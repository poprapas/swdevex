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

var fakedatabase = [
            {id: '1', name: '9ostrd', username: 'admin', password: 'password', role: 'admin'},
            {id: '2', name: 'robotic', username: 'user', password: 'password', role: 'user'}
        ];

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  	function(username, password, done) {
  		for(var i in fakedatabase){
  			if(fakedatabase[i].username == username && fakedatabase[i].password == password){
  				return done(null, fakedatabase[i]);
  			}
  		}
  		return done(null, false);
  	}
));

passport.serializeUser(function(user, done) {
  	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	for(var i in fakedatabase){
		if(fakedatabase[i].id == id){
			return done(null, fakedatabase[i]);
		}
	}
	return done(null, false);
});

// config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//config cookieParser
app.use(cookieParser( "secret", {"path": "/"} ));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(session({ secret: 'keyboard cat',
				  resave: true,
				  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.user = req.user;
    next();
});

app.post('/auth', passport.authenticate('local', { 
	successRedirect: '/user',
	failureRedirect: '/',
	failureFlash: true })
);

app.get('/logout', loggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

// create and run web application on port 8080 
var http = require('http').Server(app);

// include routes
var routes = require('./routes')(app, loggedIn);

 // catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
});

http.listen(8080);

