
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const personModel = require('../models/person.model');

const generateUserID = function () {
    return Math.random().toString(36).substring(2, 15);
};


module.exports = {
    signUp : async (data) => {
        const user = await personModel.findOne({
            username: data.username
        });
        if (user) {
            throw Boom.conflict('User already exists!');
        }

        data.personid = generateUserID();
        data.admin = false;
        let person = await personModel(data).save();

        let returnData = {
            _id: person._id,
            username: person.username,
            personid: person.personid
        };
        return returnData;
    },
    getAllUser: async () => {
       let persons = await personModel.findAll();
       return persons;
    },

    getOneUser: async (personid) => {
        
        let person = await personModel.findByPersonId(personid);
        return person;
    },
    updatePasswordAsAdmin: async (req, h) => {
        try {
            let item = await personModel.find({
                personid: req.params.id
            });
            if (!item[0]) return Boom.notFound();
            if (!item[0].comparePassword(req.payload.oldpassword)) {
                return false;
            }
            item[0].password = req.payload.password;
            let res = await item[0].save();
            if(res) {
                return true;
            }
            return false;
        } catch (error) {
            return error;
        }
    },

    updatePasswordAsUser: async (req, h) => {
        try {
            let item = await personModel.find({
                personid: req.auth.credentials.personid
            });
            if (!item[0]) return Boom.notFound();
            if (!item[0].comparePassword(req.payload.oldpassword)) {
                return false;
            }
            item[0].password = req.payload.password;
            let res = await item[0].save();
            if (res) {
                return true;
            }
            return false;
        } catch (error) {
            return error;
        }
    },

    deleteOneUserAsAdmin: async(id) => {
        try {
            await personModel.delete(id);
        } catch (error) {
           return err; 
        }
    }
};