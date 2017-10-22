const express = require('express');
// express does not parse the data which comes in request body 
// so we need body-parser library for parsing and to make use of data
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();

// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/googleAiProject')
// mongoose.connect('mongodb://syedhabib:123456@ds141474.mlab.com:41474/patientapp', {
//     useMongoClient: true
// });

// we use app.use() to register any type of middleware with express

app.use(cors())
// to wireup bodyparser with express we do this
// here json() assumes that the data is in json form and convert it into object
app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
    console.log("111111111111111111", err);
    res.status(422).send({ error: err._message });
});

module.exports = app;