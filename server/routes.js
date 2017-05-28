const path = require('path');
module.exports = function(app, passport, admin, nameId, nameSubjects) {
  // For all GET requests, send back index.html
  // so that PathLocationStrategy can be used
  app.get('/*', function(req, res) {
    // console.log("Here");
    console.log(req.flash('error'));
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
    var additionalClaims = {};
    isProf = isProfessor(req.user);
    isAd = isAdmin(req.user);

    if (isProf || isAd) {
      if (isAd) {
        console.log("Logged in as admin")
        additionalClaims.admin = true;
      }
      admin.auth().createCustomToken(uid, additionalClaims)
      .then(function(customToken) {
        var user = {
          givenName: req.user.givenName,
          instructorId: isProf ? nameId[req.user.displayName] : 6215,
          token: customToken
        }
        res.send(JSON.stringify(user));
      })
      .catch(function(error) {
        console.log("Error creating custom token:", error);
        res.send({status: 500})
      });
    } else {
      res.send({status: 403})
    }
  });
};

function isProfessor(user) {
  emailRegex = /^@northwestern\.edu$/;
  return emailRegex.test(user.mail) && user.displayName in nameId;
}

function isAdmin(user) {
  admins = process.env.ADMINS.split(',');
  return admins.includes(user.uid);
}