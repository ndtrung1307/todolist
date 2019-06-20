'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    validate: {
        payload: {
            name: Joi.string().required(),
            discript: Joi.string().required()
        }
    }
};