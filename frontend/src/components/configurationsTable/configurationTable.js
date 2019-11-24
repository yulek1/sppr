import template from './configurationTable.html';
import {mapState} from "vuex";

export default {
    name: 'configurationTable',
    template,
    data() {
        return {
            columnsVisible: {
                pattern: { title: 'Main Pattern', display: true },
                cost: { title: 'Cost', display: true },
                tacticName: { title: 'Tactic name', display: true },
                modificationType: { title: 'Modification type', display: true },
            },
            showDetailIcon: true
        }
    },
    computed: mapState([
        'configuration'
    ]),
    methods: {
        toggle(row) {
            this.$refs.table.toggleDetails(row)
        },
        onStartClicked() {
            this.$router.push({path:"/vectorForm"})
        }
    }
}