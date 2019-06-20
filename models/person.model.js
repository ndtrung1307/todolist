'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');



const personSchema = new Schema({
    personid: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
});

personSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

personSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

personSchema.statics.findByPersonId = async function (id) {

    let person = await this.find({
        personid : id
    }).catch((err) => {
        throw err;
    });
    return person;
};

personSchema.statics.findAll = async function () {
    let persons = await this.find({}).catch((err) => {
        throw err;
    });
    return persons;
};

personSchema.statics.delete = async function (id) {
    await this.deleteOne({
        personid: id
    }).catch((err)=>{
        return err;
    });
};


module.exports = mongoose.model('Person', personSchema);
