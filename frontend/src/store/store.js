import Vue from 'vue';
import Vuex from 'vuex';
import mainService from '../services/mainService';

Vue.use(Vuex);

const actions = {
    CALL_VECTOR_SERVICE: async (state, data) => {
       let response = await mainService.createVector(data);
       state.commit('SET_VECTOR', response.data);
    },

    CALL_CONFIGURATION_SERVICE: async (state, data) => {
        let response = await mainService.createConfiguration(data);
        state.commit('SET_CONFIGURATION', response.data);
    }
};

const mutations = {
    SET_VECTOR : (state, vector) => {
        Vue.set(state, 'vector', vector);
    },
    SET_CONFIGURATION: (state, configuration) => {
        Vue.set(state, 'configuration', configuration);
    }
};

export default new Vuex.Store({
    state: {},
    getters : {},
    mutations,
    actions
});