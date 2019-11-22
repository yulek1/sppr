import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import app from './app/app';

Vue.use(Buefy);

const root = new Vue({
        render: h => h(app)
    }).$mount('.app');


document.body.appendChild(root.$el)
