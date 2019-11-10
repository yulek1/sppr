const production = require('./production');
const knex = require('knex')(require('../../knexfile'));

module.exports = {
    createVector (inputObject) {

        production.identifyQualityVector(inputObject);
        return Promise.resolve('resolved!');

        // return knex('test_table').insert({
        //             username,
        //             password
        // })
    }
};