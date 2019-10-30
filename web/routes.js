'use strict';

const routeHandler = require('./../handlers/route-handler');
class Routes {
    constructor(app) {
        this.app = app;
    }
    /* creating app Routes starts */
    appRoutes() {
        this.app.post('/usernameAvailable', routeHandler.userNameCheckHandler);
        this.app.post('/getUserId', routeHandler.getUserIdHandler);
        this.app.post('/getMessages', routeHandler.getMessagesRouteHandler);
        this.app.get('*', routeHandler.routeNotFoundHandler);
    }

    routesConfig() {
        this.appRoutes();
    }
}
module.exports = Routes;