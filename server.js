// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// required for passport
app.use(session({secret: process.env.SECRET}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./server/config/passport')(passport);

require('./server/routes.js')(app, passport);
// Start the app by listening on the default
// Heroku port
app.listen(port);
console.log("APP LISTENING: PORT " + port);