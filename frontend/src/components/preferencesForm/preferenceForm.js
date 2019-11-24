import template from './preferenceForm.html';

export default {
    name: 'preferenceForm',
    template,
    data: () => ({
        pattern: [
            {id: 'layered', name: 'Layered architecture'},
            {id: 'pipesFilters', name: 'Pipes and Filters'},
            {id: 'clientServer', name: 'Client-server'},
            {id: 'soa', name: 'Service-oriented architecture'},
            {id: 'microservices', name: 'Microservices architecture'},
            {id: 'peerToPeer', name: 'Peer to Peer'},
            {id: 'publishSubscriber', name: 'Publish-subscriber'},
            {id: 'eventOriented', name: 'Event-oriented'},
            {id: 'plugins', name: 'Plugins'}
        ],
        selected: 'pipesFilters'
    }),

    methods: {
        onGenerateConfigurationClicked() {
            this.$store.dispatch('CALL_CONFIGURATION_SERVICE', {
                preferred: this.selected
            });
            this.$router.push({path:"/configurationTable"})
        }
    }
}
