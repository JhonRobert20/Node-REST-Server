const { connection } = require('../create/create');
const { sendResponse } = require('../../Functions/sendResponse')
var id = 250;

// function deleteThrows: DELETE /players/{id}/games: elimina les tirades del jugador

function deleteThrows(id, res) {
  const querydeleteThrows = `DELETE FROM throws WHERE \`id_user\` = ${id}`;
  connection.query(querydeleteThrows, (err, result) => sendResponse(res, err, result));
}

module.exports.deleteThrows = deleteThrows;