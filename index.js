const express = require('express');
const routes = require('./routes');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(express.json());

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

app.use(routes);

app.listen(3000, () => {
  console.log('App running on http://localhost:3000');
});
