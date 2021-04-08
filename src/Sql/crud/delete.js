const { connection } = require('../create/create');
const { sendResponse } = require('../../Functions/sendResponse')
var id = 250;

// function deleteThrowsUser: DELETE /players/{id}/games: elimina les tirades del jugador

function deleteThrowsUser(id, res) {
  const queryDeleteThrowsUser = `DELETE FROM throws WHERE \`id_user\` = ${id}`;
  connection.query(queryDeleteThrowsUser, (err, result) => sendResponse(res, err, result));
}

module.exports.deleteThrowsUser = deleteThrowsUser;