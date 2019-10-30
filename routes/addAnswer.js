var express = require('express');
var router = express.Router();
var globals = require('../public/globals')
var Answer = require('../sequelize').Answer;

router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        const data = {
            answer: req.body.answer,
            //anonymous: req.body.anonymous,
            questionId: req.body.questionId,
            userId: req.user.id,
            displayName: req.user.firstName
        };
        Answer.create(data).then(() => {
            console.log("Answer added successfully")
            res.send({ message: "Answer added successfully", success: true })
        }).catch(err => {
            console.log("Error in database", err)
            res.status(500).json(err)
        })
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

module.exports = router;