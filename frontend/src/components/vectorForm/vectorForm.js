import template from './vectorForm.html';
import store from '../../store/store';

export default {
    name: 'vectorForm',
    template,
    data: () => ({
            manufacturer: [
                {id: 'low', name: 'Low'},
                {id: 'medium', name: 'Middle'},
                {id: 'high', name: 'Many'}
            ],
            deviceType: [
                {id: 'sensors', name: 'Sensors'},
                {id: 'mixed', name: 'Sensors and Actuators'},
                {id: 'actuators', name: 'Actuators'}
            ],
            geographicDistribution: [
                {id: 'low', name: 'Low'},
                {id: 'medium', name: 'Medium'},
                {id: 'high', name: 'High'}
            ],
            addUserFrequency: [
                {id: 'low', name: 'Low'},
                {id: 'medium', name: 'Medium'},
                {id: 'high', name: 'High'}
            ],
            usersQuantity: [
                {id: 'low', name: 'Low'},
                {id: 'medium', name: 'Medium'},
                {id: 'high', name: 'High'}
            ],
            mobility: [
                {id: 'low', name: 'Low'},
                {id: 'medium', name: 'Medium'},
                {id: 'high', name: 'High'}
            ],
            realTime: [
                {id: 'yes', name: 'Yes'},
                {id: 'no', name: 'No'}
            ],
            analytics: [
                {id: 'yes', name: 'Yes'},
                {id: 'no', name: 'No'}
            ],
            selectedManufacturer: 'low',
            selectedDeviceType: 'sensors',
            selectedGeographicalDistribution: 'low',
            selectedAddUserFrequency: 'low',
            selectedUsersQuantity: 'low',
            selectedMobility: 'low',
            selectedRealTime: 'no',
            selectedAnalytics: 'no'
    }),

    methods: {
        onGenerateVectorClicked() {
            this.$store.dispatch('CALL_VECTOR_SERVICE', {
                manufacturer: this.selectedManufacturer,
                deviceType: this.selectedDeviceType,
                geographicDistribution: this.selectedGeographicalDistribution,
                addUserFrequency: this.selectedAddUserFrequency,
                usersQuantity: this.selectedUsersQuantity,
                mobility: this.selectedMobility,
                realTime: this.selectedRealTime,
                analytics: this.selectedAnalytics
            });
            this.$router.push({path:"/vectorArea"})
        }
    }
}
