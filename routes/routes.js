const router = require('express').Router();
const { genPassword } = require('../utils/passwordUtils');
const { User } = require('../mongo').models;
const { isAuth } = require('./auth.middleware');
const passport = require('passport');

router.post('/login', passport.authenticate('local'));

router.post('/register', async (req, res) => {
  const { salt, hash } = genPassword(req.body.password);

  const newUser = new User({
    username: req.body.username,
    hash,
    salt,
  });

  await newUser.save();
  return res.json(newUser);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  return res.send('logout');
});

router.get('/private', isAuth, (req, res, next) => {
  return res.json(req.user);
});

module.exports = router;
