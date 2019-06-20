'use strict'

const AuthBearer = require('hapi-auth-bearer-token');
const authService = require('../../services/auth.service');

module.exports = {
    name: 'JWT-Authen',
    version: '1.0',
    register: (server, options) => {
        try {
            server.register(AuthBearer);

            server.auth.strategy('Bearer', 'bearer-access-token', {
                allowQueryToken: false,
                tokenType: 'Bearer',
                validate: async (request, token, h) => {
                    
                    try {
                        const userData = await authService.decodeToken(token);
                        userData.admin ? userData.role = 'ADMIN' : userData.role = 'USER';
                        delete userData.admin;
                        return {
                            isValid: true,
                            credentials: userData
                        };
                    } catch (e) {
                        return {
                            isValid: false,
                            credentials: {}
                        };
                    }
                },
            });
        } catch (err) {
            throw err;
        }
    }
};