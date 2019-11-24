import template from './app.html';
import store from '../store/store';
import vectorForm from '../components/vectorForm/vectorForm';
import vectorArea from '../components/vectorArea/vectorArea';
import preferenceForm from '../components/preferencesForm/preferenceForm';
import configurationTable from '../components/configurationsTable/configurationTable';

// @vue/component
export default {
    name: 'app',
    store,
    template,
    data() {
        return {
            message: 'Hello Vue!'
        };
    },
    components: {
        vectorForm: vectorForm,
        preferenceForm: preferenceForm,
        configurationTable: configurationTable,
        vectorArea: vectorArea
    }
};