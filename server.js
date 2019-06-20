const Hapi = require('@hapi/hapi');
const config = require('./config/env.config');
const routesConfig = require('./routes/route.config');

const dbConnect = require('./util/database');



const init = async () => {

    const server = Hapi.server({
        port: config.port,
        host: 'localhost'
    });

    await server.register([{
        plugin: require('./plugins/jwt-auth/jwt.auth')
    }, {
        plugin: require('./plugins/hapi-autho/autho.hapi')
    }]);

     server.auth.default('Bearer');

    routesConfig.routesConfig(server);
    dbConnect;
    await server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running on %s', server.info.uri);
    });
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
