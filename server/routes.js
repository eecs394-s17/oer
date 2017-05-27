const path = require('path');
module.exports = function(app, passport, admin) {
  // For all GET requests, send back index.html
  // so that PathLocationStrategy can be used
  app.get('/*', function(req, res) {
    res.setHeader('failure-flash', req.flash('error'));
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
  });

//// VIEWS ---------------------------------------------------------------------
  // home page
  // app.get('/', function(req, res) {
  //   res.render('index.html', {
  //     user: req.user || null
  //   });
  // });

  // app.get('/login', function(req, res) {
  //   res.render('login.html', {
  //     messages: req.flash('error')
  //   });
  // });

  app.post('/login', passport.authenticate('ldapauth', {
    failureRedirect: '/',
    failureFlash: true
  }), function(req, res) {
    var uid = req.user.uid;

    admin.auth().createCustomToken(uid)
      .then(function(customToken) {
        var user = {
          displayName: req.user.givenName,
          token: customToken
        }
        res.send(JSON.stringify(user));
      })
      .catch(function(error) {
        console.log("Error creating custom token:", error);
        res.send({status: 500})
      });
  });
};