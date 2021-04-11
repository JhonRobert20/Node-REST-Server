const { throws } = require('../models/throws');
const { sendResponse } = require('../../Functions/sendResponse');

// function deletethrows DELETE /players/{id}/games: elimina les tirades del jugador

function deleteThrows(id, res) {
  throws.updateOne({ _id : id }, { $set : { throws : [], count : 0, wins : 0 } }, (err, data) => { sendResponse(res, err, data)})
}

module.exports.deleteThrows = deleteThrows;