import template from './vectorArea.html';
import { mapState } from 'vuex'

export default {
    name: 'vectorArea',
    template,
    data() {
        return {
            columns: [
                {
                    field: 'quality_attribute_id',
                    label: 'Attribute ID',
                    width: '30%',
                    centered: true,
                    numeric: true
                },
                {
                    field: 'name',
                    centered: true,
                    label: 'Attribute Name',
                }
            ]
        }
    },
    computed: mapState([
        'vector'
    ])
}