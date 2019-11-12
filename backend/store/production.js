const _ = require('lodash');
const knex = require('knex')(require('../../knexfile'));

const getRequiredAttributesRows = async (names) => {
    return knex
        .from('quality_attributes')
        .select({quality_attribute_id: 'id', name: 'name'})
        .whereIn('name', names);
};

const clearTable = async (tableName) => {
    return knex(tableName).del();
};
const writeRequiredVector = async(rowsArray) => {
    return knex('required_attributes')
        .insert(rowsArray);
};

const selectRandomRow = async (tableName) => {
    return knex(tableName)
        .orderBy(knex.raw('RAND()'))
        .limit(1);
};

const selectRows = async (tableName) => {
    return knex(tableName);
};

const selectTacticsForQualityAttributes = async (qualityVector) => {
    return knex('tactics')
        .whereIn('quality_attribute_id', qualityVector)
};

const createConfigurationPattern = async (pattern, requiredTactics) => {
    const tacticsIds = _.map(requiredTactics, 'id');

    return knex('tactic_pattern')
        .where('pattern_id', pattern.id)
        .whereIn('tactic_id', tacticsIds)
        .whereNot('modification_type_id', 1)
};

const calculateCost = (configuration, modifications) => {
    let cost = 0;
    _.forEach(configuration, configurationRow => {

        cost = cost + _.find(modifications, ['id', configurationRow.modification_type_id]).relative_cost;
    });

    return cost;
};

module.exports = {
    async identifyQualityVector(inputObject) {

        let qualityVector = {
            interoperability: false,
            modifiability: false,
            availability: false,
            information_security: false,
            performance: false
        };

        switch(inputObject.manufacturer) {
            case 'medium':
                qualityVector.interoperability = true;
                break;
            case 'high':
                qualityVector.interoperability = true;
                qualityVector.modifiability = true;
            default: break;
        }

        switch (inputObject.deviceType) {
            case 'sensors':
                break;
            case 'actuators':
                qualityVector.modifiability = true;
                qualityVector.performance = true;
                qualityVector.information_security = true;
                break;
            case 'mixed':
                qualityVector.modifiability = true;
                qualityVector.performance = true;
                qualityVector.information_security = true;
                break;
            default: break;
        }

        switch(inputObject.geographicDistribution) {
            case 'medium':
                qualityVector.interoperability = true;
                qualityVector.availabiity = true;
                break;
            case 'high':
                qualityVector.interoperability = true;
                qualityVector.availabiity = true;
                qualityVector.information_security = true;
            default: break;
        }

        switch(inputObject.addUserFrequency) {
            case 'medium':
                qualityVector.information_security = true;
                break;
            case 'high':
                qualityVector.information_security = true;
            default: break;
        }

        switch(inputObject.usersQuantity) {
            case 'medium':
                qualityVector.performance = true;
                qualityVector.availabiity = true;
                break;
            case 'high':
                qualityVector.performance = true;
                qualityVector.availabiity = true;
                qualityVector.information_security = true;
            default: break;
        }

        switch(inputObject.mobility) {
            case 'medium':
                qualityVector.performance = true;
                break;
            case 'high':
                qualityVector.performance = true;
                qualityVector.availabiity = true;
                qualityVector.information_security = true;
            default: break;
        }

        switch(inputObject.realTime) {
            case 'yes':
                qualityVector.performance = true;
                qualityVector.information_security = true;
                break;
            default: break;
        }

        switch(inputObject.analytics) {
            case 'yes':
                qualityVector.performance = true;
                break;
            default: break;
        }

        if(inputObject.manufacturer === 'medium') {
            qualityVector.interoperability = true;
            qualityVector.information_security = true;
        }

        const requiredQualityVector = _.pickBy(qualityVector, (value, key) => value === true );

        const vectorFowWrite = await getRequiredAttributesRows(_.keys(requiredQualityVector));

        await clearTable('required_attributes');
        await writeRequiredVector(vectorFowWrite);

        return vectorFowWrite;
    },

    async performConstraintSearch() {
        const patterns = await selectRows('patterns');
        const qualityVector = await selectRows('required_attributes').then(rows => _.map(rows, 'quality_attribute_id'));
        const requiredTactics = await selectTacticsForQualityAttributes(qualityVector);
        const modifications = await selectRows('modifications_pattern_tactic');
        for (const pattern of patterns) {
            const configuration = await createConfigurationPattern(pattern, requiredTactics);
            const cost = calculateCost(configuration, modifications);

            console.log('Cost: ' + cost);

            // formStringForConfiguration(pattern, requiredTactics);
            // await writeConfiguraiton()
        }
    }
}
