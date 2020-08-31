const passport = require('passport');
const Account = require('../models/Account');
const config = require('config');

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(Account.createStrategy());

// serialize user data for sessions
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// WEBTOKEN STRATEGY (JWT)
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('jwt.secret');


passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    Account.findOne({
        _id: jwt_payload.uid
    }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;