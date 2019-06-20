
const jwt = require('jsonwebtoken');
const config = require('../config/env.config');
const jwtDecode = require('jwt-decode');

module.exports = {
    createToken: async user => {
        let scopes;
        // Sign the JWT
        return jwt.sign({
            id: user._id,
            username: user.username,
            personid: user.personid,
            admin: user.admin
        }, config.jwtSecret, {
            algorithm: 'HS256',
            expiresIn: "1h"
        });
    },
    decodeToken: async (token) => {
        return await jwtDecode(token);
    } 
};