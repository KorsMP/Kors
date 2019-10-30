var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../sequelize').User;

router.post('/', function (req, res) {
    console.log(req.body)
    const data = {
        rollNumber: req.body.rollNumber,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        year: req.body.year,
        branch: req.body.branch,
        section: req.body.section,
        userName: req.body.rollNumber,
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
            res.send({ message: "Roll number already exists" ,exists:true})
        }
        else {
            User.create({
                rollNumber: data.rollNumber,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                email: data.email,
                userName: data.userName,
                password: hash,
                year: data.year,
                branch: data.branch,
                section: data.section,
                phone: data.phone
            }).then(() => {
                console.log("User has registered successfully")
                res.send({ message: "User has registered successfully",success:true })
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