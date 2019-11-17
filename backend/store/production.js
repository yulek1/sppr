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

const selectRows = async (tableName) => {
    return knex(tableName);
};

const selectTacticsForQualityAttributes = async (qualityVector) => {
    return knex('tactics')
        .whereIn('quality_attribute_id', qualityVector)
};

const createConfigurationForPattern = async (pattern, requiredTactics) => {
    const tacticsIds = _.map(requiredTactics, 'id');

    return knex('tactic_pattern')
        .join('patterns', 'tactic_pattern.pattern_id', 'patterns.id')
        .join('tactics', 'tactic_pattern.tactic_id', 'tactics.id')
        .join('modifications_pattern_tactic', 'tactic_pattern.modification_type_id', 'modifications_pattern_tactic.id')
        .select({
            pattern_id: 'tactic_pattern.pattern_id',
            pattern_name: 'patterns.name',
            tactic_id: 'tactic_pattern.tactic_id',
            tactic_name: 'tactics.name',
            modification_type_id: 'tactic_pattern.modification_type_id',
            modification_type_name: 'modifications_pattern_tactic.name'
        })
        .where('tactic_pattern.pattern_id', pattern.id)
        .whereIn('tactic_pattern.tactic_id', tacticsIds)
        .whereNot('tactic_pattern.modification_type_id', 1)
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
        let configurations = {};

        for (const pattern of patterns) {
            const baseConfiguration = await createConfigurationForPattern(pattern, requiredTactics);
            //const additionalConfigurations = varyTactics(baseConfiguration);
            let tacticsArray = [];
            for (const configuration of baseConfiguration) {
                tacticsArray.push(_.omit(configuration, 'pattern_id', 'pattern_name'));
            }
            configurations[pattern.name] = {};
            configurations[pattern.name].cost = calculateCost(baseConfiguration, modifications);
            configurations[pattern.name].configuration = tacticsArray;
            return configurations;
        }
    }
};
