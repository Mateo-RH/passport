const router = require('express').Router();
const { genPassword } = require('./passwordUtils');
const { User } = require('./mongo').models;

router.post('/login', (req, res) => {
  return res.send('login');
});

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
  return res.send('logout');
});

router.get('/private', (req, res, next) => {
  return res.send('private');
});

module.exports = router;
