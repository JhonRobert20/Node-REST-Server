const { connection } = require('../create/create');
const { throwDices } = require('../../Functions/dices');
const { sendResponse } = require('../../Functions/sendResponse');

// function createUser: POST: /players : crea un jugador
// fucntion makeThrow: POST /players/{id}/games/ : un jugador específic realitza una tirada dels daus.

function createUser(name, res) {
  var queryAddUser = '';

  if (name === '' || name === undefined){
    name = 'ANONYMOUS';
    queryAddUser = `INSERT users(\`name\`) VALUES ('${name}');`;

  } else {
    queryAddUser = `INSERT INTO users (\`name\`) 
    SELECT '${name}'
    WHERE NOT EXISTS (SELECT * FROM \`users\` WHERE \`name\`='${name}' LIMIT 1) limit 1;`
  }
  connection.query(queryAddUser, (err, result) => sendResponse(res, err, result));
}

function makeThrow(id, res) {
  var dices = throwDices();
  id = parseInt(id);
  const queryAddThrow = `INSERT INTO throws (\`id_user\`, \`result\`) VALUES (${id}, ${dices});`;
  connection.query(queryAddThrow, (err, result) => sendResponse(res, err, result));
}

module.exports.createUser = createUser;
module.exports.makeThrow = makeThrow;