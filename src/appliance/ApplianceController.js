var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ocr = require('../ocr/ocr.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
    ocr.process(__dirname + '/test.jpg', function(err, text){
        if(err){
            console.log(err)
        } else {
            res.end(text);
        }
    });
});

module.exports = router;