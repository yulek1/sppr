const production = require('./production');
const knex = require('knex')(require('../../knexfile'));

module.exports = {
    createVector (inputObject) {
        const qualityVector = production.identifyQualityVector(inputObject);
        return qualityVector;
    },

    runConstraintSearch (inputObject) {
       return production.performConstraintSearch();
    }
};