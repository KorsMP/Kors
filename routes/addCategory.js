var express = require('express');
var router = express.Router();
var Category = require('../sequelize').Category;

router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        const data = {
            catName: req.body.catName,
        };
        Category.create(data).then(() => {
            console.log("Category added successfully")
            res.send({ message: "Category added successfully" })
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