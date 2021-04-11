const mysql = require('mysql');

var user = "root";
var password = ""; 

var connection = mysql.createConnection({
  host : 'localhost',
  user : user,
  password : password,
  multipleStatements: true
});

module.exports.connection = connection;