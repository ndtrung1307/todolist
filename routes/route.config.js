
const userRouter = require('./user.route.config');
const authRouter = require('./auth.route.config');
const taskRouter = require('./task.route.config');

exports.routesConfig = (server) => {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            return 'Hello Chou!';
        }
    });

    

    userRouter.routeconfig(server);
    authRouter.routeconfig(server);
    taskRouter.routesConfig(server);
};
