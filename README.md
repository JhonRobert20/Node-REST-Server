# Node REST Server + MongoDB/MySql + JWT, Jhon Robert

npm install;</br>
npm test to run test;</br>
node index.js to run server;</br>
Check in src/Config for your database config

# Routes for postman:

http://localhost:8000/login/
- .post, you don't need pass nothing
- In headers: Authorization  Bearer "your token"
- You can use this token up to 1 hour after creating it

http://localhost:8000/players/
- .get & post
- in post use body: { "name" : "new name" }

http://localhost:8000/players/:id/:name
- .put, pass the id and the new name

/players/:id/games/
- .get, .post & .delete
- for all just pass the id

http://localhost:8000/players/ranking/
- .get

http://localhost:8000/players/ranking/losers
- .get

http://localhost:8000/players/ranking/winners
- .get

# test
Test maked in mysql and mongo
