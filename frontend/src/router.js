import vectorForm from './components/vectorForm/vectorForm';
import vectorArea from './components/vectorArea/vectorArea';
import preferencesForm from './components/preferencesForm/preferenceForm';
import configurationTable from './components/configurationsTable/configurationTable';

import VueRouter from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/vectorForm'
    },
    {
        path: '/vectorForm',
        component: vectorForm
    },
    {
        path: '/vectorArea',
        component: vectorArea
    },
    {
        path: '/preferencesForm',
        component: preferencesForm
    },
    {
        path: '/configurationTable',
        component: configurationTable
    }
];

export default new VueRouter({
    mode: 'history',
    routes
});