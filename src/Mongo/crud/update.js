const { sendResponse } = require('../../Functions/sendResponse');
const { throws } = require('../models/throws');
const { mongo } = require('../connection/connect')

// function updateName: PUT /players : modifica el nom del jugador

function updateName(id, name, res) {

  if(name === '') {
    object.name = "ANONYMOUS";
    throws.updateOne({ _id: mongo.mongo.Types.ObjectId(id) }, { $set : { name: name }}, (err, data) => { sendResponse(res, err, data) })

  } else {
    throws.find({name : name}, (err, data) => {
      if(data.length === 0 ) {
        
        throws.updateOne({ _id: mongo.mongo.Types.ObjectId(id) }, { $set : { name: name }}, (err, data) => { sendResponse(res, err, data) } )

      } else {
        const message = `User ${name} is already in the database`
        sendResponse(res, message, data)
      }
    })
  }
  
}

module.exports.updateName = updateName;