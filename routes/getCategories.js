var express = require('express');
var router = express.Router();
var globals = require('../public/globals')
var Category = require('../sequelize').Category

router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        Category.findAll({
            attributes: ['catName']
        }).then(result => {
            console.log(result)
            res.send(result)
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