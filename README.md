# Node REST Server + MongoDB/MySql + JWT + Redis, Jhon Robert

npm install;</br>
npm test to run test;</br>
node index.js to run server;</br>
to use the redis server you should write "redis-server" on your cmd</br>
Check in src/Config for your database and redis config</br>

# Routes for postman:

http://localhost:8000/login/
- .post, you can pass "name" and "password" in post body
- saved in readys
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
