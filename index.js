const express = require('express');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());

const passport = require('passport');
require('./passport')(passport);
app.use(passport.initialize());

app.use(routes);
app.listen(3000, () => {
  console.log('App running on http://localhost:3000');
});
