const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { User } = require('../mongo').models;

const pathToKey = path.join(__dirname, '../utils/id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

async function authMiddleware(req, res, next) {
  const tokenParts = req.headers.authorization.split(' ');

  if (isBearerToken(tokenParts)) {
    try {
      const { sub } = jwt.verify(tokenParts[1], PUB_KEY, {
        algorithms: ['RS256'],
      });
      req.user = await User.findById(sub);
      return next();
    } catch (error) {}
  }
  res.send(401);
}

function isBearerToken(tokenParts) {
  return tokenParts[0] === 'Bearer' && isJWTFormat();

  function isJWTFormat() {
    return tokenParts[1].match(/\S+\.\S+\.\S+/) !== null;
  }
}

module.exports = authMiddleware;
