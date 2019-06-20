const userController = require('../controllers/person.controller');
const personValidation = require('../validation/schemas/user.schemas');


exports.routeconfig = server => {
    server.route({
        method: 'POST',
        path: '/register',
        handler: userController.register,
        options: {
            validate: {
                payload: personValidation.validate.payload
            },
            auth: false
        }
    });

    server.route({
        method: 'PUT',
        path: '/user/{id}',
        handler: userController.UpdatePasswordUserAsAdmin,
        options: {
            validate: {
                payload: personValidation.validate.payload_changePass
            },
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/user',
        handler: userController.UpdatePasswordUser,
        options: {
            validate: {
                payload: personValidation.validate.payload_changePass
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/user',
        handler: userController.getUser,
        options: {
            plugins: {
                'hapiAuthorization': {
                    roles: ['USER','ADMIN']
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/user/{id}',
        handler: userController.getOneUser,
        options: {
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/user/{id}',
        handler: userController.deleteById,
        options: {
            plugins: {
                'hapiAuthorization': {
                    role: 'ADMIN'
                }
            }
        }
    });
};