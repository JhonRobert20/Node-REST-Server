const fs = require('fs');
const { connection } = require('../../Config/sql')
const path = require("path");

var first = "use node_api";
var create = fs.readFileSync(path.resolve(__dirname ,"./createData/crear.sql"), "utf-8");
var trigers = fs.readFileSync(path.resolve(__dirname ,"./createData/trigerrs.sql"), "utf-8");
var lines = trigers.split('\n');


class Sql {

  static instance;

  constructor (name = "Sql"){
    if (!! Sql.instance) {
      return Sql.instance;
    }

    Sql.instance = this;
    this.name = name;
    this.connected = false;
    this.sql = connection;
  }

  connect() {
    this.sql.connect(err => {
      if (err) return(err)
      this.sql.query(first, (err, result) => {
        if(err) {
          this.sql.query(create, 
            async (err, result) => {
              if (!err) {
                for (let line of lines) {
                  await this.sql.query(line, (err, result) => { 
                    if( err) console.log('alredy exists')})
                }
              }
          })
        } 
      });
    })
    this.connected = true;
  };
};

const sql = new Sql();


module.exports.sql = sql;
module.exports.connection = sql.sql;
// >node src/sql/create/create.js