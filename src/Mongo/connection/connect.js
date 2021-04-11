const mongoose = require('mongoose');
const { failMessage, connectedMessage, options, database } = require('../../Config/mongo');

class Mongo {

  static instance;

  constructor(name = "Mongo") {
    if (!!Mongo.instance) {
      return Mongo.instance;
    }
    
    Mongo.instance = this;
    this.name = name;
    this.connected = false;
    this.mongo = mongoose;
    return this;
  }

  connect() {
    this.mongo.connect( database, options )
    .then( () => { console.log( connectedMessage )})
    .catch( err => { console.log( failMessage, ++count )})
    this.connected = true;
  };

  disconnect() {
    this.mongo.disconnect(err => { if (!err) console.log("Connection with MongoDb is over") });
    this.connected = false;
  }
  
}

const mongo = new Mongo();

module.exports.mongo = mongo;