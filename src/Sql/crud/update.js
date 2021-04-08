const { connection } = require('../create/create');
const { sendResponse } = require('../../Functions/sendResponse');

//function updateName: PUT /players : modifica el nom del jugadorr

function updateName(id, newName, res) {
  id = parseInt(id);
  const queryUpdate = `UPDATE users SET \`name\` = '${newName}' WHERE (\`id\` = \'${id}\');`;
  connection.query(queryUpdate, (err, result) => sendResponse(res, err, result));
}

module.exports.updateName = updateName;