const options = {
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const database = "mongodb://localhost/throws";

const connectedMessage = "Successfully connected to the database";
const failMessage = "Mongo connection unsuccesful";

module.exports.options = options;
module.exports.database = database;
module.exports.connectedMessage = connectedMessage;
module.exports.failMessage = failMessage;