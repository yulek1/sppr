const production = require('./production');
const knex = require('knex')(require('../../knexfile'));

module.exports = {
    createVector (inputObject) {
        const qualityVector = production.identifyQualityVector(inputObject);
        return qualityVector;

        // return knex('test_table').insert({
        //             username,
        //             password
        // })
    },

    runConstraintSearch (inputObject) {
        production.performConstraintSearch();
    }
};