//  select the database
const option = "mysql"; 
// select the database

const port = 8000;

if (option === "mysql") {
  const { app } = require('./src/Sql/Server/app');
  app.listen(port, () => console.log(`Api is listen on port ${port}, mysql`));

} else {
  const { app } = require('./src/Mongo/Server/app');
  app.listen(port, console.log(`Server listen on port ${port}, mongo`))
}
