var tesseract = require('node-tesseract');

// Recognize text of any language in any format
exports.process = function (filepath, callback){
    tesseract.process(filepath,{psm:4},function(err, text) {
        callback(err, text);
    });
}


