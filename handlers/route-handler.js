const queryHandler = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');

'use strict';
class RouteHandler {

    async userNameCheckHandler(request, response) {
        const username = request.body.username;
        console.log(username)
        if (username === "") {
            response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USERNAME_NOT_FOUND
            });
        } else {
            try {
                const count = await queryHandler.userNameCheck({
                    username: username.toLowerCase()
                });
                if (count > 0) {
                    response.status(200).json({
                        error: true,
                        message: CONSTANTS.USERNAME_AVAILABLE_FAILED
                    });
                } else {
                    response.status(200).json({
                        error: false,
                        message: CONSTANTS.USERNAME_AVAILABLE_OK
                    });
                }
            } catch (error) {
                response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                    error: true,
                    message: CONSTANTS.SERVER_ERROR_MESSAGE
                });
            }
        }
    }

    async getUserInfoHandler(request, response) {
        try {
            const res = await queryHandler.getUserInfo({
                userId: request.user.id
            });
            response.status(200).json(res)
        } catch (error) {
            response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.SERVER_ERROR_MESSAGE
            });
        }
    }

    async getMessagesRouteHandler(request, response) {
        const userId = request.body.userId;
        const toUserId = request.body.toUserId;
        if (userId == '') {
            response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USERID_NOT_FOUND
            });
        } else {
            try {
                const messagesResponse = await queryHandler.getMessages({
                    userId: userId,
                    toUserId: toUserId
                });
                response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error: false,
                    messages: messagesResponse
                });
            } catch (error) {
                response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
                    error: true,
                    messages: CONSTANTS.USER_NOT_LOGGED_IN
                });
            }
        }
    }

    getUserIdHandler(request, response) {
        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            id: request.user.id
        });
    }

    routeNotFoundHandler(request, response) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.ROUTE_NOT_FOUND
        });
    }
}

module.exports = new RouteHandler();
