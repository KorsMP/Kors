'use strict';

var User = require('../sequelize').User;
var Message = require('../sequelize').Message;
var moment = require('moment');
var Op = require('Sequelize').Op

class QueryHandler {
    constructor() {
    }

    userNameCheck(data) {
        return new Promise((resolve, reject) => {
            User.count({
                where: {
                    userName: data.username
                }
            }).then(result => {
                resolve(result);
            }).catch(error => {
                console.log("error in db",error)
                reject(error)
            })
        })
    }

    makeUserOnline(req) {
        return new Promise((resolve, reject) => {
            User.update({
                online: true
            }, {
                where: {
                    id: req.user.id
                }
            }).then(result => {
                resolve(result);
            }).catch(error => {
                console.log("error in db")
                reject(error)
            })
        })
    }
    getUserInfo({ userId, socketId = false }) {
        return new Promise(async (resolve, reject) => {
            try {
                User.findAll({
                    where: {
                        id: userId
                    }
                }).then(result => {
                    resolve(result[0]);
                }).catch(error => {
                    console.log("error in db")
                    reject(error)
                })
            } catch (error) {
                reject(error)
            }
        });
    }

    addSocketId({ userId, socketId }) {
        return new Promise(async (resolve, reject) => {
            try {
                User.update({
                    socketId: socketId,
                    online: true
                }, {
                    where: {
                        id: userId
                    }
                }).then(result => {
                    resolve(result);
                }).catch(error => {
                    console.log("error in db")
                    reject(error)
                })
            } catch (error) {
                reject(error)
            }
        });
    }

    getChatList(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                User.findAll({
                    where: {
                        socketId: {
                            [Op.ne]: userId
                        }
                    }
                }).then(result => {
                    resolve(result);
                }).catch(error => {
                    console.log("error in db")
                    reject(error)
                })
            } catch (error) {
                reject(error)
            }
        });
    }

    insertMessages(messagePacket) {
        return new Promise(async (resolve, reject) => {
            try {
                Message.create(messagePacket).then((result) => {
                    console.log("Message inserted successfully")
                    resolve(result)
                }).catch(err => {
                    console.log("Error in database", err)
                    reject(err)
                })
            } catch (error) {
                reject(error)
            }
        });
    }

    getMessages({ userId, toUserId }) {
        console.log(userId, toUserId)
        let condition =
        {
            [Op.or]: [
                {
                    toUserId: userId,
                    fromUserId: toUserId
                },
                {
                    toUserId: toUserId,
                    fromUserId: userId
                }
            ]
        }
        return new Promise(async (resolve, reject) => {
            try {
                Message.findAll({
                    where: condition,
                    attributes: ['fromUserId', 'toUserId', 'message']
                }).then(result => {
                    resolve(result);
                }).catch(error => {
                    console.log("error in db", error)
                    reject(error)
                })
            } catch (error) {
                reject(error)
            }
        });
    }

    logout(userID, req, isSocketId) {
        return new Promise((resolve, reject) => {
            try {
                let condition = {};
                if (isSocketId) {
                    condition.socketId = userID
                } else {
                    condition.id = userID;
                }
                User.update({
                    online: false
                }, {
                    where: condition
                }).then(result => {
                    resolve({ "isAuthenticated": false });
                }).catch(error => {
                    console.log("error in db")
                    reject(error)
                })
            } catch (error) {
                reject(error)
            }
        });
    }
}
module.exports = new QueryHandler();