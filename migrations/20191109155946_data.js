const _ = require('lodash');
const fs = require('fs');

const getData = (data = 'default') => {
    const fileName = `${__dirname}/data/${data}.json`;

    if (!fs.existsSync(fileName)) {
        console.log(`Data "${data}" does not exist`);
    }
    return require(fileName);
};


exports.up = function(knex) {
    const data = getData('default');
    let knexPromises = [];
        _.forEach(data.tables, table => {
           knexPromises.push(
            knex(table.name).insert(table.data)
           )
        });
    return Promise.all(knexPromises);
};

exports.down = function(knex) {
    const data = getData('default');
    let knexPromises = [];
        _.forEach(data.tables, table => {
            knexPromises.pop(knex(table.name).del());
        });
    return Promise.all(knexPromises);
};
