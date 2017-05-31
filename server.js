// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
// var jwt_decode = require('jwt-decode');

// Firebase admin SDK
var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "oer-f0dd1",
    clientEmail: "firebase-adminsdk-qms01@oer-f0dd1.iam.gserviceaccount.com",
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: "https://oer-f0dd1.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "server"
  }
});

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
app.use(cookieParser(process.env.SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

// required for passport
app.use(session({secret: process.env.SECRET}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./server/config/passport')(passport);

require('./server/routes.js')(app, passport, admin);
// Start the app by listening on the default
// Heroku port
app.listen(port);
console.log("APP LISTENING: PORT " + port);