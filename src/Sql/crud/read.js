const { connection } = require('../create/create');
const { sendResponse } = require('../../Functions/sendResponse')

// function selectPlayer:  GET /players/{id}/games: retorna el llistat de jugades per un jugador.
// function eachPlayerMedia: GET /players/: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
// function allUsersMedia: GET /players/ranking: retorna el ranking mig de tots els jugadors del sistema. És a dir, el percentatge mig d’èxits.
// function losersData: GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
// function winnersData: GET /players/ranking/winner: retorna el jugador amb mitjor percentatge d’èxit

function selectPlayer(id, res) {
  const querySelectPlayer = `select t.id as id, t.result as result, t.win as win, u.percent as 'total percent'
  from users as u join throws as t
  on u.id = t.id_user
  where u.id = ${id}`;
  connection.query(querySelectPlayer, (err, result) => sendResponse(res, err, result));
}

function eachPlayerMedia(res) {
  var queryPlayerMedia = 'select * from users';
  connection.query(queryPlayerMedia, (err, result) => sendResponse(res, err, result));
}


function allUsersMedia(res) {
  const queryMedia = "select avg(all percent) as 'average' from users";
  connection.query(queryMedia, (err, result) => sendResponse(res, err, result));
}

function losersData(res) {
  const losersQuery = 'select * from users where percent = (SELECT(MIN(percent)) FROM users)';
  connection.query(losersQuery, (err, result) => sendResponse(res, err, result));
}

function winnersData(res) {
  const winnersQuery = 'select * from users where percent = (SELECT(MAX(percent)) FROM users)';
  connection.query(winnersQuery, (err, result) => sendResponse(res, err, result));
}


module.exports.selectPlayer = selectPlayer;
module.exports.eachPlayerMedia = eachPlayerMedia;
module.exports.allUsersMedia = allUsersMedia;
module.exports.losersData = losersData;
module.exports.winnersData = winnersData;