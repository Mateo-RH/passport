const mongoose = require('mongoose');

const connection = mongoose.createConnection(
  'mongodb://localhost:27017/passport_auth',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
});

connection.model('User', UserSchema);

module.exports = connection;
