const path = require('path');
const fs = require('fs');
const request = require('request');
module.exports = function(app, passport, admin) {
  var nameId;
  fs.readFile('./name-id.json', 'utf8', function(err, data) {
    if (err) throw err;
    nameId = JSON.parse(data);
  });

  // var nameSubjects;
  // fs.readFile('./name-subjects.json', 'utf8', function(err, data) {
  //   if (err) throw err;
  //   nameSubjects = JSON.parse(data);
  // });

  app.get('/get-courses', function(req, res) {
    var params = {
      key: process.env.COURSE_API_KEY
    }

    if (req.query.id) {
      params.id = req.query.id;
    } else {
      params.term = req.query.term;
      params.instructor = req.query.instructor;
    }
    
    console.log("Getting courses");
    console.log(params);
    request({url: 'https://api.asg.northwestern.edu/courses', qs: params}, function(err, response, body) {
      if (err) { console.log(err); res.send({status: 500}); }
      res.send(response.body);
    })
  });

  // For all GET requests, send back index.html
  // so that PathLocationStrategy can be used
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
  });

  app.post('/login', passport.authenticate('ldapauth', {
    failureRedirect: '/',
    failureFlash: true
  }), function(req, res) {
    console.log(req.user);
    var uid = req.user.uid;
    var additionalClaims = {};
    isProf = isProfessor(req.user, nameId);
    isAd = isAdmin(req.user);

    if (isProf || isAd) {
      if (isAd) {
        console.log("Logged in as admin");
        additionalClaims.admin = true;
      } else {
        console.log("Logged in as professor");
      }

      console.log("Generating token");
      admin.auth().createCustomToken(uid, additionalClaims)
      .then(function(customToken) {
        if (isProf || isAd) {
          console.log("Updating instructor ID in database");
          admin.database().ref('instructors/' + uid).update({
            "instructorId": 6215 //nameId[req.user.displayName]
          });
        } //6215
        var user = {
          givenName: req.user.givenName,
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

function isProfessor(user, nameId) {
  return user.title && 
    (user.title.indexOf('Professor') != -1 || user.title.indexOf('Lecturer') != -1) &&
    user.displayName in nameId;
}

function isAdmin(user) {
  return process.env.ADMINS.split(',').includes(user.uid);
}