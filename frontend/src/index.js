import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import store from './store/store';
import router from './router';
import app from './app/app';
import VueRouter from 'vue-router';

Vue.use(Buefy, {
    defaultIconPack: 'fa',
});
Vue.use(VueRouter);

const root = new Vue({
        render: h => h(app),
        store,
        router
    }).$mount('.app');


document.body.appendChild(root.$el)
