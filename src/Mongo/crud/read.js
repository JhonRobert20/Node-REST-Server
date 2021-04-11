const { sendResponse } = require('../../Functions/sendResponse');
const { throws } = require('../models/throws');
const mongoose = require('mongoose');

// function findAll: GET /players/: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
// function findById: GET /players/{id}/games: retorna el llistat de jugades per un jugador.
// function ranking: GET /players/ranking: retorna el ranking mig de tots els jugadors del sistema. És a dir, el percentatge mig d’èxits.
// function rankingLosers: GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
// function rankingWinners: GET /players/ranking/winner: retorna el jugador amb pitjor percentatge d’èxit

function findAll(res) {
  throws.aggregate(
    [
      {$project: {count:1, wins:1, name: 1 , percent:{$cond: [ { $eq: [ "$count", 0 ] }, 0, { $divide: [ "$wins", "$count" ] }]}}}
    ], (err, data) => { sendResponse(res, err, data) }
  )
}

function findById(id, res) {
  throws.aggregate(
    [ 
      { $match : { 
        _id : mongoose.Types.ObjectId(id) 
      } },
      { $project: { count:1, wins:1, throws: 1, name: 1 , percent:{ $cond: [ { $eq: [ "$count", 0 ] }, 0, { $divide: [ "$wins", "$count" ] } ] } } }
    ], (err, data) => { sendResponse(res, err, data) }
  )
}

function ranking(res) {
  throws.aggregate(
    [
      {
        $group : {
          _id : "ranking",
          ranking : { $avg : { $cond: [ { $eq : ["$count", 0]}, 0 , {$divide : [ "$wins", "$count" ] } ] } }
        }
      }
    ], (err, data) => { sendResponse(res, err, data) }
  )
};

function rankingLosers(res) {
  throws.aggregate(
    [
      { $project : {  name : 1, percent : { $cond : [ { $eq : [ "$count", 0 ]  }, 0, { $divide : [ "$wins", "$count" ] } ] }, document: "$$ROOT" } },
      { $group: { 
      _id : { $max : "$percent"},
      docs : { $push: "$$ROOT" } 
    }},
    { $sort : { _id : 1 } },
    { $limit : 1}
    ], (err, data) => { sendResponse(res, err, data) }
  )
}

function rankingWinners(res) {
  throws.aggregate(
    [
      { $project : {  name : 1, percent : { $cond : [ { $eq : [ "$count", 0 ]  }, 0, { $divide : [ "$wins", "$count" ] } ] }, document: "$$ROOT" } },
      { $group: { 
      _id : { $max : "$percent"},
      docs : { $push: "$$ROOT" } 
    }},
    { $sort : { _id : -1 } },
    { $limit : 1}
    ], (err, data) => { sendResponse(res, err, data) }
  )
}


module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.ranking = ranking;
module.exports.rankingLosers = rankingLosers;
module.exports.rankingWinners = rankingWinners;
