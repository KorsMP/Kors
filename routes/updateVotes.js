var express = require('express');
var router = express.Router();
var Question = require('../sequelize').Question;
var Answer = require('../sequelize').Answer;

router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        let id = req.body.id;
        let voteType = req.body.voteType;
        let table = req.body.table;
        console.log(id, voteType, table)
        if (voteType == "upVote" && table == "answer")
            updateUpVoteAnswer(id, res);
        else if (voteType == "upVote" && table == "question")
            updateUpVoteQuestion(id, res);
        else if (voteType == "downVote" && table == "answer")
            updateDownVoteAnswer(id, res);
        else if (voteType == "downVote" && table == "question")
            updateDownVoteQuestion(id, res);
        else
            res.status(500).send({ message: "Check parameters" });
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

function updateUpVoteAnswer(id, res) {
    Answer.increment('upVote', { where: { id: id } })
        .then(result => {
            console.log(result)
            res.send({ message: "Updated successfully" })
        }).catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
}

function updateUpVoteQuestion(id, res) {
    Question.increment('upVote', { where: { id: id } })
        .then(result => {
            console.log(result)
            res.send({ message: "Updated successfully" })
        }).catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
}

function updateDownVoteAnswer(id, res) {
    Answer.increment('downVote', { where: { id: id } })
        .then(result => {
            console.log(result)
            res.send({ message: "Updated successfully" })
        }).catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
}

function updateDownVoteQuestion(id, res) {
    Question.increment('downVote', { where: { id: id } })
        .then(result => {
            console.log(result)
            res.send({ message: "Updated successfully" })
        }).catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
}

module.exports = router;