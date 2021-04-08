const express = require('express');
var { json } = require('body-parser');
const { callConnect } = require('../create/create')
const { createUser, makeThrow } = require('../crud/add');
const { selectPlayer, eachPlayerMedia, allUsersMedia, losersData, winnersData } = require('../crud/read')
const { deleteThrowsUser } = require('../crud/delete')
const { updateName } = require('../crud/update')

callConnect();
const app = express();
app.use(json());

app.get("/players/",(req, res) => {
    eachPlayerMedia(res)
});

app.put("/players/:id/:name", (req, res) => {
    updateName(req.params.id ,req.params.name, res);
})

app.post("/players/", (req, res) => {
    createUser(req.body.name, res)
})

app.route("/players/:id/games/")
.get((req, res) => { selectPlayer(req.params.id, res) })
.post((req, res) => { makeThrow(req.params.id, res) })
.delete((req, res) => { deleteThrowsUser(req.params.id, res) });

app.get("/players/ranking/", (err, res) => {
    allUsersMedia(res);
});

app.get("/players/ranking/losers/", (err, res) => {
    losersData(res);
})
app.get("/players/ranking/winners/", (err, res) => {
    winnersData(res);
})

module.exports.app = app;