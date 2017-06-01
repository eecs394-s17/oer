const path = require('path');
const fs = require('fs');
const request = require('request');
const TERM = 4660;
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
    var callback = function(err, response, body) {
      if (err) { console.log(err); res.send({status: 500}); }
      res.send(body);
    };

    if (req.query.id) {
      getCourseById(req.query.id, callback);
    } else {
      getCoursesByInstructorId(req.query.term, req.query.instructor, callback);
    }
  });

  function getCoursesByInstructorId(term, instructorId, callback) {
    var params = {
      'key': process.env.COURSE_API_KEY,
      'term': term,
      'instructor': instructorId
    };
    request({url: 'https://api.asg.northwestern.edu/courses', qs: params}, callback);
  }

  function getCourseById(id, callback) {
    var params = {
      'key': process.env.COURSE_API_KEY,
      'id': id
    };
    request({url: 'https://api.asg.northwestern.edu/courses', qs: params}, callback);
  }

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
        if (isProf) {
          console.log("Updating instructor in database");
          var instructorId = 6215 //nameId[req.user.displayName];
          admin.database().ref('instructors/' + uid).update({
            "name": req.user.displayName,
            "instructorId": instructorId
          });

          getCoursesByInstructorId(TERM, instructorId, function (err, response, body) {
            if (err) { console.log(err); res.send({status: 500}); }
            var instructorCourses = {};
            courses = JSON.parse(body);
            for (let i = 0; i < courses.length; i++) {
              instructorCourses[courses[i].id] = true;
            }
            admin.database().ref('instructors/' + uid + '/courses').update(instructorCourses);
          });
        } else {
          admin.database().ref('admins/' + uid).update({
            "name": req.user.displayName,
          });
        }

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
    user.mail.indexOf('@northwestern.edu') != 1 &&
    (user.title.indexOf('Professor') != -1 || user.title.indexOf('Lecturer') != -1) &&
    user.displayName in nameId;
}

function isAdmin(user) {
  return process.env.ADMINS.split(',').includes(user.uid);
}