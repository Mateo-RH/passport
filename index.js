const express = require('express');
const routes = require('./routes');

require('./mongo');

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, () => {
  console.log('App running on http://localhost:3000');
});
