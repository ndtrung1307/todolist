'use strict';

const Joi = require('@hapi/joi');

module.exports ={
    validate : {
        payload: {
            username: Joi.string().alphanum().min(3).max(30).required().description('UserName must be alphabet and from 3 to 30 character'),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        },
        payload_changePass : {
            oldpassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            confirm: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }
    }
};