'use strict';

const Boom = require('@hapi/boom');
const personModel = require ('../../models/person.model');
const authService = require('../../services/auth.service');

exports.login = async (req,h) =>{
    let username = req.payload.username;

    try {
        let person = await personModel.findOne({
            username: username
        });

        if (!person) {
           throw Boom.notFound('This Username is unvalid');
        }

        if (!person.comparePassword(req.payload.password)) {
            throw Boom.badRequest('Password or Username is not correct');
        }
        person.password = undefined;
        let token = await authService.createToken(person);
        return h.response(`JWT: ${token}`).code(201);
    } catch (error) {
        throw error;
    }
};

// exports.refresh_token = (req, res) => {
//     try {
//         req.body = req.jwt;
//         let token = JWT.sign(req.body, config.jwtSecret,{
//             algorithm: 'HS256',
//             expiresIn: "1h"
//         });
//         res.status(201).send({
//             id: token
//         });
//     } catch (err) {
//         res.status(500).send({
//             errors: err
//         });
//     }
// };
