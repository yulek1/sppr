const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store/store');
const cors = require('cors')

const app = express();



app.use(cors())
app.use(express.static('frontend'));
app.use(bodyParser.json());

app.post('/createVector', (req, res) => {
    store
        .createVector({
            manufacturer: req.body.data.manufacturer,
            deviceType: req.body.data.deviceType,
            geographicDistribution: req.body.data.geographicDistribution,
            addUserFrequency: req.body.data.addUserFrequency,
            usersQuantity: req.body.data.usersQuantity,
            mobility: req.body.data.mobility,
            realTime: req.body.data.realTime,
            analytics: req.body.data.analytics
        })
        .then((vectorForWrite) => res.json(vectorForWrite))
});

app.post('/createConfiguration', (req, res) => {
   store
       .runConstraintSearch({
           preferred: req.body.data.preferred
       })
       .then((configurations) => res.json(configurations))
});

const port = 7555;
console.log(`Server running on port ${port}`);
app.listen(port);

process.title = 'myDissertServer!!!';