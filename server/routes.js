const path = require('path');
module.exports = function(app, passport) {
  // For all GET requests, send back index.html
  // so that PathLocationStrategy can be used
  app.get('/*', function(req, res) {
    console.log(req.user);
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
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }), function(req, res) {
    res.send({status: 'ok'});
  });
};