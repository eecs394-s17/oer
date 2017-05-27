// server/config/passport.js

var LdapStrategy = require('passport-ldapauth');

module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    var sessionUser = user;
    done(null, sessionUser);
  });

  passport.deserializeUser(function(sessionUser, done) {
    done(null, sessionUser);
  });

  // LDAP Authentication
  options = {
    server: {
      url: 'ldaps://registry.northwestern.edu:636',
      bindDn: process.env.LDAP_BIND_DN,
      bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
      searchBase: 'dc=northwestern,dc=edu',
      searchFilter: 'nuIdTag={{username}}'
    }
  };

  passport.use(new LdapStrategy(options));
};