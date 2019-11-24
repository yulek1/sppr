const pathVector = 'http://localhost:7555/createVector';
const pathConfiguration = 'http://localhost:7555/createConfiguration';
import axios from 'axios'

const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export default {
    createVector: (data) => {
        return axios.post(pathVector, {
            data: data
        }, options)
    },

    createConfiguration: (data) => {
        return axios.post(pathConfiguration, {
            data: data
        }, options)
    }
};