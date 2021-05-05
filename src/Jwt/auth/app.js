const jwt = require('jsonwebtoken');
const { client } = require('../../Config/redis')
const { sendBadResponse } = require('../../Functions/sendResponse')


function verifyToken(req, res, next) {
  client.GET('userId', (err, value) => {
    if(!err) {
      req.token = value;
      next()
    } else {
      sendBadResponse(res, "please create a token", 403)
    } 
  })    
};

function loginJwt(req, res) {
    jwt.sign({ }, 'secretkey', { expiresIn: '3600s' }, (err, token) => {
        if(err) {
          sendBadResponse(res, err.message, 404)
          return;
        }
        
        client.SET("userId", token, 'EX', 60 * 60, (err, reply) => {
            if(err) {
                sendBadResponse(res, err.message, 404)
                return;
            }
            var name = req.body.name ? req.body.name : "you don't have a name";
            var password = req.body.password ? req.body.password : "you don't have a password";
            
            client.SET("name", name);
            client.SET("password", password);
            
            res.json({ succes: true, token })
        })
    })
}

module.exports.loginJwt = loginJwt;
module.exports.verifyToken = verifyToken;