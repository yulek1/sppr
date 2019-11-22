import RequestHelper from 'app/util/requestHelper';

const pathVector = '/createVector';
const pathConfiguration = '/createConfiguration';

export default {
    createVector: (data) => {
        window.fetch(pathVector, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    },

    createConfiguration: (data) => {
        window.fetch(pathConfiguration, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
};