'use strict';

const TaskModel = require('../models/task.model');
const Boom = require('@hapi/boom');
const taskService = require('../services/task.service');

/**
 * List all item
 */
exports.getAllItem = async (req, h) => {
    var params = req.query;
    
    // console.log(ultilService.convertQueryParams2Aggregate(params));
    let tasks;
    try {
        switch (req.auth.credentials.role) {
            case 'USER':
                tasks = await taskService.getAllTaskAsUser(req.auth.credentials.personid, req.query.page, req.query.limit);
                return h.response(tasks).code(201);
            case 'ADMIN':
                tasks = await taskService.getAllTaskAsAdmin(req.query.page, req.query.limit);
                return h.response(tasks).code(201);
                
            default:
                break;
        }
    } catch (error) {
        h.response(Boom.internal());
    }
};


/**
 * find one item
 */
exports.getOneItem = async (req, h) => {
    let tasks;
    try {
        switch (req.auth.credentials.role) {
            case 'USER':
                tasks = await taskService.getOneTaskAsUser(req.params.id, req.auth.credentials.personid);
                return h.response(tasks).code(201);
            case 'ADMIN':
                tasks = await taskService.getOneTaskAsAdmin(req.params.id);
                return h.response(tasks).code(201);

            default:
                break;
        }
    } catch (error) {
        h.response(Boom.internal());
    }
};


/**
 * POST a Item
 */
exports.create = async (req, h) => {
    
    const taskData = {
        name: req.payload.name,
        discript: req.payload.discript,
        personid: req.auth.credentials.personid
    };

    try {
        let res = await taskService.createTask(taskData);
        return h.response({
            message: "Item created successfully",
            Task: res
        }).code(201);
    } catch (error) {
        h.response(Boom.internal());
    }
};

exports.update = async (req, h) => {

    try {
        switch (req.auth.credentials.role) {
            case 'USER':
                await taskService.updateOneTaskAsUSer(req, h);
                return h.response("message: item data updated successfully").code(201);


            case 'ADMIN':
                await taskService.updateOneTaskAsAdmin(req, h);
                return h.response("message: item data updated successfully").code(201);

            default:
                break;
        }
    } catch (error) {
        h.response(Boom.internal());
    }
};

/**
 * Delete item by ID
 */
exports.removeByID = async (req, h) => {

    try {
        switch (req.auth.credentials.role) {
            case 'USER':
                await taskService.deleteOneTaskAsUser(req, h);
                 return h.response({
                     msg: `task has been deleted with id ${req.params.id}`
                 }).code(201);


            case 'ADMIN':
                await taskService.deleteOneTaskAsAdmin(req, h);
                 return h.response({
                     msg: `task has been deleted with id ${req.params.id}`
                 }).code(201);

            default:
                break;
        }
       
    } catch (error) {
        h.response(Boom.internal());
    }
};