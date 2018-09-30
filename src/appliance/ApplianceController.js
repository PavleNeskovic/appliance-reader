var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ocr = require('../ocr/OCR');
var base64Img = require('../base64-img/Base64Converter')
var data = require('./testData');
var fs = require('fs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
    //base64 to image
    base64Img.img(data.base64Image,function(err, filepath){
        if(err){
            console.log(err)
        } else {
            //procces text from image
            ocr.process(filepath, function(err, text){
                if(err){
                    console.log(err)
                } else {
                    //remove image
                    fs.unlinkSync(filepath);
                    //print text
                    res.end(text);
                }
            });
        }
    });
});

module.exports = router;