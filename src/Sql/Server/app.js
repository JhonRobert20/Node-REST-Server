const express = require('express');
var { json } = require('body-parser');
const { sql } = require('../create/create');

const { addUser, makeThrow } = require('../crud/add');
const { updateName } = require('../crud/update')
const { findById, findAll, ranking, rankingLosers, rankingWinners } = require('../crud/read')
const { deleteThrows } = require('../crud/delete')
const { jwt, verifyToken, user } = require('../../Jwt/auth/app');


sql.connect()

const app = express();
app.use(json());

app.post('/login', (req, res) => {
    jwt.sign({ user }, 'secretkey', { expiresIn: '3600s' }, (err, token) => {
        if(!err) res.json({ token });
    })
});

app.route("/players/")
.get(verifyToken, (req, res) => { findAll(res) })
.post(verifyToken, (req, res) => { addUser(req.body.name, res) })

app.put("/players/:id/:name", verifyToken, (req, res) => {
    updateName(req.params.id ,req.params.name, res);
})

app.route("/players/:id/games/")
.get(verifyToken, (req, res) => { findById(req.params.id, res) })
.post(verifyToken, (req, res) => { makeThrow(req.params.id, res) })
.delete(verifyToken, (req, res) => { deleteThrows(req.params.id, res) });

app.get("/players/ranking/", verifyToken, (err, res) => {
    ranking(res);
});

app.get("/players/ranking/losers/", verifyToken, (err, res) => {
    rankingLosers(res);
})
app.get("/players/ranking/winners/", verifyToken, (err, res) => {
    rankingWinners(res);
})

module.exports.app = app;