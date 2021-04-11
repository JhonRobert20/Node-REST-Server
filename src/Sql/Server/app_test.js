const express = require('express');
var { json } = require('body-parser');
const { sql } = require('../create/create')
const { addUser, makeThrow } = require('../crud/add');
const { findById, findAll, ranking, rankingLosers, rankingWinners } = require('../crud/read')
const { deleteThrows } = require('../crud/delete')
const { updateName } = require('../crud/update')


sql.connect()

const app = express();
app.use(json());

app.get("/players/",(req, res) => {
    findAll(res)
});

app.put("/players/:id/:name", (req, res) => {
    updateName(req.params.id ,req.params.name, res);
})

app.post("/players/", (req, res) => {
    addUser(req.body.name, res)
})

app.route("/players/:id/games/")
.get((req, res) => { findById(req.params.id, res) })
.post((req, res) => { makeThrow(req.params.id, res) })
.delete((req, res) => { deleteThrows(req.params.id, res) });

app.get("/players/ranking/", (err, res) => {
    ranking(res);
});

app.get("/players/ranking/losers/", (err, res) => {
    rankingLosers(res);
})
app.get("/players/ranking/winners/", (err, res) => {
    rankingWinners(res);
})

module.exports.app = app;