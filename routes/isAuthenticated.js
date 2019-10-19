var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.session.cookie);
        res.send({
            "isAuthenticated": true,
            "user": req.user
        });
    }
    else {
        res.send({ "isAuthenticated": false });
    }
});

module.exports = router;