const {mongo} = require('../connection/connect')

const Throws = mongo.mongo.Schema({
  name    : { type : String, required : true, unique : false },
  throws  : { type : Array, required : false, unique : false },
  count   : { type : Number, required : false, unique : false, default: 0 },
  wins    : { type : Number, required : false, unique : false, default: 0}
});

const throws = mongo.mongo.model('throws', Throws)

module.exports.throws = throws;