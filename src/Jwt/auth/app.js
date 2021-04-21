const jwt = require('jsonwebtoken');

const user = {
  id: 1,
  username: 'guess',
  email: 'guess@gmail.com'
}

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  
  if(typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    req.token = token;
    next();

  } else {
    res.sendStatus(403);
    res.json({
      success: false,
      message: "please create a token" 
    })
  }
}

module.exports.user = user;
module.exports.jwt = jwt;
module.exports.verifyToken = verifyToken;