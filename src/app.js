var express = require('express');
var app = express();

var ApplianceController = require('./appliance/ApplianceController');
app.use('/appliances', ApplianceController);

module.exports = app;