var passport                = require('passport');
var User                    = require('../models/user');
const bcrypt                = require('bcrypt');
var LocalStrategy           = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    var condition = {};
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(pattern.test(username)) {
        condition = { email : { $regex : ".*" + username + ".*", $options:"i"} };
    }
    else if(username.length == 10 || Number.isInteger(username)) {
        condition = { mobile : username };
    }
    else {
        return done(null, false , {message: 'Invalid username'})
    }

    User.findOne(condition, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'User not registered'});
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
        return done(null, user);
    });

}));