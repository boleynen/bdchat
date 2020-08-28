const passport = require('passport');
const Account = require('../models/Account');


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
opts.secretOrKey = 'MyVerySecretWord';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    Account.findOne({
        _id: jwt_payload.uid
    }, function (err, user) {
        if (err) {
            console.log("1");
            return done(err, false);
        }
        if (user) {
            console.log("2");
            return done(null, user);
        } else {
            console.log("3");
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;