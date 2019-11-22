const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store/store');
const app = express();

app.use(express.static('frontend'));
app.use(bodyParser.json());

app.post('/createVector', (req, res) => {
    store
        .createVector({
            manufacturer: req.body.manufacturer,
            deviceType: req.body.deviceType,
            geographicDistribution: req.body.geographicDistribution,
            addUserFrequency: req.body.addUserFrequency,
            usersQuantity: req.body.usersQuantity,
            mobility: req.body.mobility,
            realTime: req.body.realTime,
            analytics: req.body.analytics
        })
        .then((vectorForWrite) => res.json(vectorForWrite))
});

app.post('/createConfiguration', (req, res) => {
   store
       .runConstraintSearch({
           preferred: req.body.preferred
       })
       .then((configurations) => res.json(configurations))
});

const port = 7555;
console.log(`Server running on port ${port}`);
app.listen(port);

process.title = 'myDissertServer!!!';