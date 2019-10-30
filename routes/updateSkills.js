var express = require('express');
var router = express.Router();
var User = require('../sequelize').User;

router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        let skills = (req.body.skills).join(',')
        let id = req.user.id
        console.log("99")
        console.log(req.body.skills)
        console.log(skills,id)
        User.update({
            skills: skills
        }, {
            where: {
                id: id
            }
        }).then(result => {
            console.log("updated")
            res.send({ success: true })
        }).catch(err => {
            console.log("Error in database", err)
            res.status(500).json(err)
        });
    }
    else {
        res.send({ "isAuthenticated": false })
    }
})


module.exports = router;