const express = require('express');
const { json } = require('body-parser');
const { mongo } = require('../connection/connect')

const { addUser, makeThrow } = require('../crud/create')
const { updateName } = require('../crud/update')
const { findAll, findById, ranking, rankingLosers, rankingWinners } = require('../crud/read')
const { deleteThrows } = require('../crud/delete')
const { verifyToken, loginJwt } = require('../../Jwt/auth/app')


const app = express();

mongo.connect();

app.use(json());

app.post('/login', (req, res) => { loginJwt(req, res) });

app.route("/players/")
.post(verifyToken, (req, res) => { addUser(req.body, res) })
.get(verifyToken, (req, res) => { findAll(res)})

app.route("/players/:id/:name/")
.put(verifyToken, (req, res) => { updateName(req.params.id, req.params.name, res)})

app.route("/players/:id/games/")
.get(verifyToken, (req, res) => { findById(req.params.id, res) })
.post(verifyToken, (req, res) => { makeThrow(req.params.id, res)})
.delete(verifyToken, (req, res) => { deleteThrows(req.params.id, res)})

app.get("/players/ranking/", verifyToken, (req, res) => { ranking(res)})
app.get("/players/ranking/losers/", verifyToken, (req, res) => { rankingLosers(res)})
app.get("/players/ranking/winners/", verifyToken, (req, res) => { rankingWinners(res)})

module.exports.app = app;