var base64Img = require('base64-img');

// Recognize text of any language in any format
exports.img = function (base64Text, callback){
    base64Img.img(base64Text, './resources/tempImage', 'temp', function(err, filepath) {
        callback(err,filepath);
    });
}
