var express = require('express');
var router = express.Router();
var globals = require('../public/globals')
var Question = require('../sequelize').Question;
var QuestionCategoryMapping = require('../sequelize').QuestionCategoryMapping;

router.post('/all/byTime', function (req, res) {
    if (req.isAuthenticated()) {
        let page = req.body.page;
        let pageSize = globals.pageSize;
        const offset = parseInt((page - 1) * pageSize);// page-1 to start from 1 
        //const limit = parseInt(offset + pageSize);
        //console.log(offset, limit)
        Question.findAll({
            order: [['createdAt', 'DESC']],
            // attributes: { exclude: [''] },
            offset: offset,
            limit: pageSize
        }).then(result => {
            console.log(result)
            res.send({ 'result': result, 'success': true })
        }).catch(error => {
            console.log("db error", error)
            res.status(500).json(err)
        });
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

router.post('/byCategory/byTime', function (req, res) {
    if (req.isAuthenticated()) {
        let page = req.body.page;
        let catName = req.body.catName;
        let pageSize = globals.pageSize;
        const offset = parseInt((page - 1) * pageSize);// page-1 to start from 1 
        //const limit = parseInt(offset + pageSize);
        //console.log(offset, limit)
        Question.findAll({
            include: [{
                model: QuestionCategoryMapping,
                required: false,
                where: {
                    catName: catName
                },
                attributes: [],
            }],
            order: [['createdAt', 'DESC']],
            offset: offset,
            limit: pageSize
        }).then(result => {
            //console.log(result)
            if (result.length > 0)
                res.send(result)
            else
                res.send({ message: "sorry no more questions" })
        }).catch(error => {
            console.log("db error", error)
            res.status(500).json(err)
        });
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

router.post('/byCategory/byTime1', function (req, res) {
    if (req.isAuthenticated()) {
        let page = req.body.page;
        let catName = req.body.catName;
        let pageSize = globals.pageSize;
        const offset = parseInt((page - 1) * pageSize);// page-1 to start from 1 
        var resultObj = [];
        //const limit = parseInt(offset + pageSize);
        //console.log(offset, limit)
        QuestionCategoryMapping.findAll({
            where: {
                catName: catName
            },
            order: [['createdAt', 'DESC']],
            attributes: ['questionId'],
            offset: offset,
            limit: pageSize
        }).then(result => {
            //console.log(result)
            if (result.length > 0)
                getQuestionById(0, result, res, resultObj)
            else
                res.send({ message: "sorry no more questions" })
        }).catch(error => {
            console.log("db error", error)
            res.status(500).json(err)
        });
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

router.post('/all/byUser/byTime', function (req, res) {
    if (req.isAuthenticated()) {
        //let page = req.body.page;
        //let pageSize = globals.pageSize;
        //const offset = parseInt((page - 1) * pageSize);// page-1 to start from 1 
        //const limit = parseInt(offset + pageSize);
        //console.log(offset, limit)
        Question.findAll({
            where: {
                userId: req.user.id
            },
            order: [['createdAt', 'DESC']],
            // attributes: { exclude: [''] },
            //offset: offset,
            //limit: pageSize
        }).then(result => {
            console.log(result)
            res.send({ 'result': result, 'success': true })
        }).catch(error => {
            console.log("db error", error)
            res.status(500).json(err)
        });
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

router.post('/byCategory/byUser/byTime', function (req, res) {
    if (req.isAuthenticated()) {
        let page = req.body.page;
        let catName = req.body.catName;
        let pageSize = globals.pageSize;
        const offset = parseInt((page - 1) * pageSize);// page-1 to start from 1 
        //const limit = parseInt(offset + pageSize);
        //console.log(offset, limit)
        Question.findAll({
            include: [{
                model: QuestionCategoryMapping,
                required: false,
                where: {
                    catName: catName
                },
                attributes: [],
            }],
            where: {
                userId: req.user.id
            },
            order: [['createdAt', 'DESC']],
            offset: offset,
            limit: pageSize
        }).then(result => {
            //console.log(result)
            if (result.length > 0)
                res.send(result)
            else
                res.send({ message: "sorry no more questions" })
        }).catch(error => {
            console.log("db error", error)
            res.status(500).json(err)
        });
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

var getQuestionById = function (x, questionsResultArray, res, resultObj) {
    if (x < questionsResultArray.length) {
        let id = questionsResultArray[x].questionId;
        Question.findAll({
            where: {
                id: id
            }
        }).then(result => {
            if (x == questionsResultArray.length - 1) {
                resultObj.push(result[0])
                console.log("done")
                res.send(resultObj)
            }
            resultObj.push(result[0])
            getQuestionById(x + 1, questionsResultArray, res, resultObj);
        }).catch(err => {
            console.log("Error in database", err)
            res.status(500).json(err)
        })
    }
};

module.exports = router;