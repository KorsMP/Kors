var express = require('express');
var router = express.Router();
var Temp = require('../sequelize').Temp;

router.post('/add', function (req, res) {
    if (req.isAuthenticated()) {
        const data = {
            catName: req.body.catName,
        };
        Temp.create(data).then(() => {
            console.log("temp added successfully")
            res.send({ message: "temp added successfully" })
        }).catch(err => {
            console.log("Error in database", err)
            res.status(500).json(err)
        })
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

router.get('/paginate', function (req, res) {
    if (req.isAuthenticated()) {
        var page = parseInt(req.query.page);
        var pageSize = 3;
        const offset = parseInt(page * pageSize);
        //const limit = parseInt(offset + pageSize);
        //console.log(offset, limit)
        Temp.findAll({
            where: {
                catName: 'aaa'
            },
            offset: offset,
            limit: pageSize
        }).then(result => {
            console.log(result)
            res.send(result)
        })
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})

module.exports = router;