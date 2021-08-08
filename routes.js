const router = require('express').Router();

router.post('/login');

router.post('/register', (req, res, next) => {
  res.redirect('/login');
});

router.get('/', (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

router.get('/login', (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
      Enter Username:<br><input type="text" name="uname">\
      <br>Enter Password:<br><input type="password" name="pw">\
      <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

router.get('/register', (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                      Enter Username:<br><input type="text" name="uname">\
                      <br>Enter Password:<br><input type="password" name="pw">\
                      <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

router.get('/protected-route', (req, res, next) => {
  res.send(
    '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
  );
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

router.get('/login-success', (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

router.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.');
});

module.exports = router;
