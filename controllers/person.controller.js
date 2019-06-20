const person = require('../models/person.model');
const authService = require('../services/auth.service');
const personService = require('../services/person.service');
const Boom = require('@hapi/boom');

/**
 * Register a User Account
 */
exports.register = (req, h) => {
    let userdata = {
        username: req.payload.username,
        password: req.payload.password
    };
    try {  
        personService.signUp(userdata).then(() => {
            return h.response('Create user successfully!').code(201);
        });
    } catch (error) {
        h.response(Boom.internal());   
    }
}; 
exports.getUser = async (req, h) => {
    let user;
    
    try {
        switch (req.auth.credentials.role) {
            case 'USER':
                let personid = req.auth.credentials.personid;
                user = await personService.getOneUser(personid);
                return h.response(user).code(201);
            case 'ADMIN':
                user = await personService.getAllUser();
                return h.response(user).code(201);

            default:
                break;
        }
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.getOneUser = async (req, h) => {
    try {
        let personID = req.params.id;
        let person = await personService.getOneUser(personID);
        return h.response(person).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.UpdatePasswordUserAsAdmin = async (req, h) => {
    try {
        let res = await personService.updatePasswordAsAdmin(req, h);
        return res ? h.response('updateSuccess').code(201) : h.response('update failue').code(404);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.UpdatePasswordUser = async (req, h) => {
    try {
        let res = await personService.updatePasswordAsUser(req, h);
        return res ? h.response('updateSuccess').code(201) : h.response('update failue').code(404);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.deleteById = async (req, h) => {
    try {
        let id = req.params.id;
        await personService.deleteOneUserAsAdmin(id);
        return h.response({
            msg: `User has been deleted with id ${req.params.id}`
        }).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};
