const express = require('express');
const { json } = require('body-parser');
const { mongo } = require('../connection/connect')

const { addUser, makeThrow } = require('../crud/create')
const { updateName } = require('../crud/update')
const { findAll, findById, ranking, rankingLosers, rankingWinners } = require('../crud/read')
const { deleteThrows } = require('../crud/delete')

const app = express()

mongo.connect();

app.use(json());


app.route("/players/")
.post((req, res) => { addUser(req.body, res) })
.get((req, res) => { findAll(res)})

app.route("/players/:id/:name/")
.put((req, res) => { updateName(req.params.id, req.params.name, res)})

app.route("/players/:id/games/")
.get((req, res) => { findById(req.params.id, res) })
.post((req, res) => { makeThrow(req.params.id, res)})
.delete((req, res) => { console.log(req.params); deleteThrows(req.params.id, res)})

app.get("/players/ranking/", (req, res) => { ranking(res)})
app.get("/players/ranking/losers", (req, res) => { rankingLosers(res)})
app.get("/players/ranking/winners", (req, res) => { rankingWinners(res)})

module.exports.app = app;