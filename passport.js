const { User } = require('./mongo').models;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const validPassword = require('./utils/passwordUtils').validPassword;

const verifyCallback = (username, password, done) => {
  User.findOne({ username })
    .then((user) => {
      if (!user) return done(null, false);
      const isValid = validPassword(password, user.hash, user.salt);
      return isValid ? done(null, user) : done(null, false);
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log(userId);
  User.findById(userId)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
