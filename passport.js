const fs = require('fs');
const path = require('path');
const { User } = require('./mongo').models;
const { Strategy, ExtractJwt } = require('passport-jwt');

const pathToKey = path.join(__dirname, './utils/id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const strategy = new Strategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub })
    .then((user) => (user ? done(null, user) : done(null, false)))
    .catch((err) => done(err, null));
});

module.exports = (passport) => {
  passport.use(strategy);
};
