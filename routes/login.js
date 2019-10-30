var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var User = require('../sequelize').User;
const queryHandler = require('./../handlers/query-handler');
var moment=require('moment');

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        console.log('inside passport')
        var hash = crypto.createHash('md5').update(password).digest('hex');
        User.findOne({
            where: {
                rollNumber: username
            }
        }).then(user => {
            if (!user) {
                console.log("Invalid roll number")
                return done(null, false, { "isAuthenticated": false, "message": "Invalid roll number" });
            }
            else {
                if (hash == user.password) {
                    return done(null, user)
                } else {
                    console.log("Invalid password")
                    return done(null, false, { "isAuthenticated": false, "message": "Invalid Password" });
                }
            }
        }).catch(err => {
            console.log(err);
            return done(null, false, { "isAuthenticated": false, "message": "DB error" });
        })
    }
));

router.post('/', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (info) { return res.send(info) }
        if (err) { return res.send(err) }
        if (!user) { return res.send('me'); }
        req.login(user,async (err) => {
            console.log(req.user);
            req.session.loginTime=moment();
            await queryHandler.makeUserOnline(req);
            return res.send({ "isAuthenticated": true, "user": user });
        })
    })(req, res, next);
});

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
        if (user) {
            done(null, user);
        } else {
            done(user.errors, false);
        }
    }).catch(err => {
        done(err, false);
    });
})

module.exports = router;