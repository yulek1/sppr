const _ = require('lodash');
const knex = require('knex')(require('../../knexfile'));

const getRequiredAttributesRows = async (names) => {
    return knex.
        from('quality_attributes')
        .select({quality_attribute_id: 'id', name: 'name'})
        .whereIn('name', names);
};

const clearVectorTable = async () => {
    return knex('required_attributes').del();
}
const writeRequiredVector = async(rowsArray) => {
    return knex('required_attributes')
        .insert(rowsArray);
}

// const dummy = _.find(array, o => o === 'Performance');

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

        await clearVectorTable();
        await writeRequiredVector(vectorFowWrite);

        return vectorFowWrite;
    }
}
