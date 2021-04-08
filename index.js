const { app } = require('./src/Sql/Server/app');
const port = 8000;

// Check in src/Sql/create/create.js for your database config

app.listen(port, () => console.log(`Api is listen on port ${port}`));