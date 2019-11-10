const production = require('./production');
const knex = require('knex')(require('../../knexfile'));

module.exports = {
    createVector (inputObject) {

        return production.identifyQualityVector(inputObject);

        // return knex('test_table').insert({
        //             username,
        //             password
        // })
    }
};