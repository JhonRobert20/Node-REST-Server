const mysql = require('mysql')    
const fs = require('fs');

var user = "root";
var password = ""; 
var connection = mysql.createConnection({
  host : 'localhost',
  user : user,
  password : password,
  multipleStatements: true
});
var first = "use node_api";
var create = fs.readFileSync("src/Sql/create/crear.sql", "utf-8");
var trigers = fs.readFileSync("src/Sql/create/trigerrs.sql", "utf-8");
var lines = trigers.split('\n');

function connect() {
  connection.connect(err => {
    if (err) console.log(err)
    connection.query(first, (err, result) => {
      if(err) {
        connection.query(create, 
          async (err, result) => {

            if (!err) {

              for (line of lines) {
                await connection.query(line, (err, result) => { 
                  if( err) console.log('alredy exists')})
              }
            }
        })
      } 
    });
  })
};

async function callConnect() {
  await connect();
  await connection.query("use node_api", (err, result) => {
    if(result) console.log("connected") 
  })
}


module.exports.callConnect = callConnect;
module.exports.connection = connection;
// >node src/sql/create/create.js