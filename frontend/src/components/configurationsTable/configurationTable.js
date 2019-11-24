import template from './configurationTable.html';
import {mapState} from "vuex";

export default {
    name: 'configurationTable',
    template,
    data() {
        return {
            data: [
            ],
            columns: [
                {
                    field: 'pattern',
                    label: 'Main Pattern',
                },
                {
                    field: 'cost',
                    label: 'Cost'
                },
                {
                    field: 'configuration.tactic_id',
                    label: 'Configuration'
                }
            ]
        }
    },
    computed: mapState([
        'configuration'
    ])
}