const router = require('express').Router();
const {
  genPassword,
  issueJWT,
  validPassword,
} = require('../utils/passwordUtils');
const { User } = require('../mongo').models;
const passport = require('passport');

router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) res.status(401).json({ msg: 'could not find user' });

      const isValid = validPassword(req.body.password, user.hash, user.salt);

      if (isValid) res.json({ user, ...issueJWT(user) });
      else res.status(401).json({ msg: 'Wrong password' });
    })
    .catch((err) => next(err));
});

router.post('/register', (req, res, next) => {
  const { salt, hash } = genPassword(req.body.password);

  const newUser = new User({
    username: req.body.username,
    hash,
    salt,
  });

  newUser
    .save()
    .then((user) => {
      const jwt = issueJWT(user);
      res.json({ user, token: jwt.token, expiresIn: jwt.expires });
    })
    .catch((err) => next(err));
});

router.get('/logout', (req, res, next) => {
  req.logout();
  return res.send('logout');
});

router.get(
  '/private',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    return res.json({ user: req.user });
  }
);

module.exports = router;
