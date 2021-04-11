const { throws } = require('../models/throws');
const { sendResponse } = require('../../Functions/sendResponse');
const { throwDices } = require('../../Functions/dices')

// function addUser: POST: /players : crea un jugador
// function makeThrow: POST /players/{id}/games/ : un jugador específic realitza una tirada dels daus.

function addUser(object, res) {
  if(object.name === '') {
    object.name = "ANONYMOUS";
    throws.create(object, (err, data) => { sendResponse(res, err, data)});
      
  } else {
    throws.find({name : object.name}, (err, data) => {

      if(data.length === 0 ) {
        throws.create(object, (err, data) => { sendResponse(res, err, data)})

      } else {
        const message = `User ${object.name} is already in the database`
        sendResponse(res, message, data)
      }
    })
  }
};

function makeThrow(id, res) {
  const dices = throwDices();
  const object = inCase(dices, id);
  throws.updateOne({ _id : id }, object, (err, data) => { sendResponse(res, err, data)});
}

function inCase(dices) {
  var object = { result : dices, win : false };

  if (dices === 7) {
    object.win = true;

    return { 
      $push : { throws : object },
      $inc : { count : 1, wins : 1}
    }
  }

  return {
    $push : { throws : object },
    $inc : { count : 1}
  }
}


module.exports.makeThrow = makeThrow;
module.exports.addUser = addUser;