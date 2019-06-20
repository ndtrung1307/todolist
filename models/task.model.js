const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commonFunc = require('../util/commonFunc');

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    discript: {
        type: String,
        required: true
    },
    personid: {
        type: String,
        required: true
    }
});

taskSchema.statics.listByPersonID = function (personid,page,limit) {   
    let query = this.find({});
    query.where('personid', personid);
    if (typeof (page) != 'undefined') {
        query = commonFunc.setPagingInfo4Query(query, page, limit);
    }
    return query.exec();
};

taskSchema.statics.listAll = function (page, limit) {
    let query = this.find({});
    if (typeof (page) != 'undefined') {
        query = commonFunc.setPagingInfo4Query(query, page, limit);
    }
    return query.exec();
};

taskSchema.statics.findByIdAsUser = function (id,userId) {
    return this.find({
        _id: id,
        personid: userId
    }).catch((err) => {
        throw err;
    });
};

taskSchema.statics.findById = function (id) {
    return this.find({
        _id: id
    }).catch((err) => {
        throw err;
    });
};

// taskSchema.statics.saveTask = async function(data){
//     let task = await bugModel.create(data);
//     console.log(task);
//     // task.save(callback);s
// };

// taskSchema.statics.listAll = async function () {

//     let tasks = await this.find({});
//     tasks.wher
//     .catch((err) => {
//         throw err;
//     });
//     return tasks;
// };


module.exports.saveTask = async function (data){
    var task = mongoose.model('Task', taskSchema);
    let res = await task.create(data).catch((err) => {
        throw err;
    });
    return res;
};

module.exports = mongoose.model('Task', taskSchema);