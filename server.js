const express = require('express');
const bodyParser = require('body-parser');
const calcFees = require('./calcFees.js');
const calcFunds = require('./calcFunds.js');

const app = express();
app.use(bodyParser.json());

app.post('/fees', function (req, res) {
    let result = {};
    req.body.map(order => {
        result[order.order_number] = calcFees(order);
    });
    res.send(result);
});

app.post('/distributions', function (req, res) {
    let result = {};
    req.body.map(order => {
        result[order.order_number] = calcFunds(order);
    });
    res.send(result);
});

app.listen(3000, () => { console.log('Server available at http://localhost:3000'); });