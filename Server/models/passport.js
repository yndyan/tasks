const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./userM');
const consts = require('./consts');

module.exports = function(passport){
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = consts.jwtSecret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    //console.log(jwt_payload);
    //console.log(jwt_payload.username);
        User.getUserByUsername(jwt_payload.username)
            .then((user)=>{
                return done(null, user);
            })
            .catch((err)=>{
                return done(err, false);
            });
    }));
};
