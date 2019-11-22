import template from './app.html';
import vectorForm from '../components/vectorForm/vectorForm';
import preferenceForm from '../components/preferencesForm/preferenceForm';

// @vue/component
export default {
    name: 'app',
    template,
    data() {
        return {
            message: 'Hello Vue!'
        };
    },
    components: {
        vectorForm: vectorForm,
        preferenceForm: preferenceForm
    }
};