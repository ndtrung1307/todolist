const ramda = require('ramda');
const config = require('../config/env.config');

exports.throwIfEmpty = (val, error) => {
    if(val === null || typeof val === 'undefined' || ramda.isEmpty(val)) {
        throw error;
    }
};

exports.setPagingInfo4Query = (query, page, limit) => {
    let limitnum = limit || config.DEFAULT_LIMIT_NUMBER_RETURN_VALUE;
    query.limit(Number(limitnum));
    query.skip((limitnum * (page - 1)));
    return query;
};