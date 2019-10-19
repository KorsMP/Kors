var express = require('express');
var router = express.Router();
var moment=require('moment');

router.get('/', function(req, res, next) {
    console.log(moment())
    var time=(moment().diff(req.session.loginTime,'seconds'));
    req.logOut();
    req.session.destroy();
    console.log(time)
    res.send({"isAuthenticated": false,"time":time});
});

module.exports = router;