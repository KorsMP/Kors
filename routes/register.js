var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../sequelize').User;

router.post('/', function (req, res) {
    const data = {
        rollNumber: req.body.rollNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    };
    var hash = crypto.createHash('md5').update(data.password).digest('hex');
    User.findOne({
        where: {
            rollNumber: data.rollNumber
        }
    }).then(user => {
        if (user) {
            console.log("Roll number already exists");
            res.send({ message: "Roll number already exists" })
        }
        else {
            User.create({
                rollNumber: data.rollNumber,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                userName: data.userName,
                password: hash
            }).then(() => {
                console.log("User has registered successfully")
                res.send({ message: "User has registered successfully" })
            }).catch(err => {
                console.log("Error in database", err)
                res.status(500).json(err)
            })
        }
    }).catch(err => {
        console.log("Error in database", err)
        res.status(500).json(err)
    })
})

module.exports = router;