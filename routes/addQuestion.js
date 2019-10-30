var express = require('express');
var router = express.Router();
var globals = require('../public/globals')
var Question = require('../sequelize').Question;
var QuestionCategoryMapping = require('../sequelize').QuestionCategoryMapping;

router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        const data = {
            question: req.body.question,
            categories: (req.body.categories).split(',').join(',').toLowerCase(),
            //anonymous: req.body.anonymous,
            userId: req.user.id,
            displayName: req.user.firstName
        };
        console.log(data)
        let categories = data.categories.split(",");
        Question.create(data).then(result => {
            addToQuestionCategoryMapping(0, result.id, categories, res)
        }).catch(err => {
            console.log("Error in database", err)
            res.status(500).json(err)
        })
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

var addToQuestionCategoryMapping = function (x, questionId, categories, res) {
    if (x < categories.length) {
        const data = {
            questionId: questionId,
            catName: categories[x]
        }
        QuestionCategoryMapping.create(data).then(() => {
            if (x == categories.length - 1) {
                console.log("Question added successfully")
                res.send({ success: true, message: "Question added successfully" })
            }
            addToQuestionCategoryMapping(x + 1, questionId, categories, res);
        }).catch(err => {
            console.log("Error in database", err)
            res.status(500).json(err)
        })
    }
};

module.exports = router;