var express = require('express');
var router = express.Router();
var globals = require('../public/globals')
var Answer = require('../sequelize').Answer;

router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        //let page = req.body.page;
        let questionId = req.body.questionId;
        //let pageSize = globals.pageSize;
        //const offset = parseInt((page-1) * pageSize);// page-1 to start from 1 
        //const limit = parseInt(offset + pageSize);
        //console.log(offset, limit)
        Answer.findAll({
            where: {
                questionId: questionId
            },
            order: [['createdAt', 'DESC']],
            // attributes: { exclude: [''] },
            // offset: offset,
            // limit: pageSize
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

module.exports = router;