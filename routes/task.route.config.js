const taskController = require('../controllers/task.controller');
const taskValidation = require('../validation/schemas/task.schemas');


exports.routesConfig = (server) => {

    server.route({
        method: 'GET',
        path: '/tasks',
        handler: taskController.getAllItem,

        options: {
            plugins: {
                'hapiAuthorization': {
                    roles: ['USER','ADMIN']
                }
            }
        },
    });
    
    server.route({
        method: 'GET',
        path: '/tasks/{id}',
        handler: taskController.getOneItem,
        options: {
            plugins: {
                'hapiAuthorization': {
                    roles: ['USER', 'ADMIN']
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/tasks',
        handler: taskController.create,
    });

    server.route({
        method: 'PUT',
        path: "/tasks/{id}",
        handler: taskController.update,
            options: {
                validate: {
                    payload: taskValidation.validate.payload
                },
                plugins: {
                    'hapiAuthorization': {
                        roles: ['USER', 'ADMIN']
                    }
                }
            }
    });


    server.route({
        method: 'DELETE',
        path: "/tasks/{id}",
        handler: taskController.removeByID,
        options: {
            plugins: {
                'hapiAuthorization': {
                    roles: ['USER', 'ADMIN']
                }
            }
        },
    });
}