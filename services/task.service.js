const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const TaskModel = require('../models/task.model');


module.exports = {
    getAllTaskAsAdmin: async (page, limit) => {
        try {
            let res = await TaskModel.listAll(page, limit);
            return res;
        } catch (error) {
            throw error;
        }
    },
    getAllTaskAsUser: async (personID,page,limit) => {
        try {
            let res = await TaskModel.listByPersonID(personID,page,limit);
            return res;
        } catch (error) {
            throw error;
        }
    },
    getOneTaskAsAdmin: async (id) => {
        try {
            let res = await TaskModel.findById(id);
            return res;
        } catch (error) {
            throw error;
        }
    },
    getOneTaskAsUser: async (id,userid) => {
        try {
            let res = await TaskModel.findByIdAsUser(id, userid);
            return res;
        } catch (error) {
            throw error;
        }
    },
    createTask: async (taskData) => {
       let res = await TaskModel.create(taskData).catch((err) => {
           throw err;
       });
       return res;
    },
    updateOneTaskAsUSer: (req,h) => {
        TaskModel.find({
            _id: req.params.id,
            personid: req.auth.credentials.personid
        }).exec().then((item) => {
            console.log(item);
            if (!item[0]) return Boom.notFound();
            item[0].name = req.payload.name;
            item[0].discript = req.payload.discript;
            item[0].save();

        }).then(() => {
            return true;
        }).catch((err) => {
            throw err;
        });
    },
    updateOneTaskAsAdmin: (req, h) => {
        TaskModel.find({
            _id: req.params.id
        }).exec().then((item) => {
            console.log(item);
            if (!item[0]) return Boom.notFound();
            item[0].name = req.payload.name;
            item[0].discript = req.payload.discript;
            item[0].save();

        }).then(() => {
            return true;
        }).catch((err) => {
            throw err;
        });
    }, 
    deleteOneTaskAsUser: (req,h) => {
        TaskModel.deleteOne({
            _id: req.params.id,
            personid: req.auth.credentials.personid
        }, function (err) {});
    },

    deleteOneTaskAsAdmin: (req, h) => {
        TaskModel.deleteOne({
            _id: req.params.id
        }, function (err) {});
    },

};


