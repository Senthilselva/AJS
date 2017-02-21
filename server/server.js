//Dependencies
// ============
var express = require('express');
// instantiate our app
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var session = require('express-session'); 
var methodOverride = require('method-override'); // for deletes in express

// Our model controllers (rather than routes)
var routes = require('./controllers/appController');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// override POST to have DELETE and PUT
app.use(methodOverride('_method'))

//allow sessions
app.use(session({ secret: 'app', 
    resave: false, saveUninitialized: false,
	cookie: { maxAge: 60000 }}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// we set the port of the app
app.set('port', process.env.PORT || 3001);


 var server = app.listen(app.get('port'), function() {
  	// then save a log of the listening to our debugger.
    console.log('----- Express server listening on port ' + server.address().port);
  });