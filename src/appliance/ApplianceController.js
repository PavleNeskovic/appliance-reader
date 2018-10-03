var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var applianceService = require('./ApplianceService');

router.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
router.use(bodyParser.json({limit: '50mb'}));

router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });

router.post('/', function (req, res) {
    applianceService.process(req.body.base64Code, function(text){
        res.end(text);
    })
});

module.exports = router;