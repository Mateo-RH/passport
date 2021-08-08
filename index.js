const express = require('express');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());

// SESSION
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(
  session({
    secret: 'random',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/passport_auth',
      collection: 'sessions',
    }),
  })
);

// PASSPORT
const passport = require('passport');
require('./passport');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log('SESSION: ', req.session);
  console.log('USER: ', req.user);
  next();
});

app.use(routes);
app.listen(3000, () => {
  console.log('App running on http://localhost:3000');
});
