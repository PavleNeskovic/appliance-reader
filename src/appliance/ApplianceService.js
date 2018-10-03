var fs = require('fs');
var ocr = require('../ocr/OCR');
var base64Img = require('../base64-img/Base64Converter')


function process(base64Code, callback){
    base64CodeToText(base64Code, function(text){
        var appliance = discoverAppliance(text);
        callback(JSON.stringify(appliance));
    });
}

function discoverAppliance(text) {
    //Initialize appliance and load dictionaries
    var appliance = new Object();
    var modelNoDictionary = ["MODEL","MODEL:","MODELNO.","MODELNO:","M.N.","M/N","M/N:","MOD","MOD:","PRODUCT","PRODUCT:","P/N","P/N:","P.N.","PROD","PROD;"];
    var serialNoDictionary = ["SERIAL","SERIAL:","S/N","S/N:","S.N.","SER","SER:"];
    var countriesDictionary = readDictionary('resources/dictionaries/coutries.txt');
    var brandDictionary = readDictionary('resources/dictionaries/appliances.txt');
    var modalNoKeys, serialNoKeys;
    //Split text into words
    words = text.convertIntoWords();
    //Model and serial number - Find words that are next to the keys (e.g. S/N, MODEL, SERIAL)
    modalNoKeys = words.diff(modelNoDictionary), serialNoKeys = words.diff(serialNoDictionary);
    appliance.modelNo = words.nextTo(modalNoKeys).join(" ");
    appliance.serialNo = words.nextTo(serialNoKeys).join(" ");
    //Date - match date regex
    appliance.manufactureDate = words.matchDate().join(" ");
    //Brand and Location = find all occurances from the dictionary and remove duplicates
    appliance.manufactureLocation = words.diff(countriesDictionary).uniq().join(" ");
    appliance.brandName = words.diff(brandDictionary).uniq().join(" ");
    return appliance;
}

String.prototype.convertIntoWords = function() {
    return this.toUpperCase().replace(/[\r\n]+/g, ' ').split(" ").cleanup();
}

Array.prototype.matchDate = function() {
    var regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;
    var result = new Array();
    this.forEach(element => {
        result = this.filter(element => element.match(regex));
    });
    return result;
}

Array.prototype.nextTo = function(keys) {
    var result = new Array();
    this.diff(keys).forEach(element => {
        return result.push(this[this.indexOf(element) + 1])
    });
    return result;
}

Array.prototype.cleanup = function(){
    var garbageDictionary = ["number","Number","NUMBER","no","No","NO","number:","Number:","NUMBER:","no:","No:","NO:","no.","No.","NO.",":","."," ",""];
    return this.filter(element => !garbageDictionary.includes(element));
}

Array.prototype.uniq = function() {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
    return this.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}

Array.prototype.diff = function(array2) {
    return this.filter(element => array2.includes(element));
}

function readDictionary(file){
    return fs.readFileSync(file).toString().split('\n');
}

function base64CodeToText(base64Code, callback) {
    base64ToImage(base64Code, function(filepath){
        imageToText(filepath, function(text){            
            callback(text);
        });
    });
}

function base64ToImage(base64Code, callback){
    base64Img.img(base64Code,function(err, filepath){
        if(err){
            console.log(err);
        } else {
            callback(filepath);
        }
    });
}

function imageToText(filepath, callback){
    ocr.process(filepath, function(err, text){
        if(err){
            console.log(err)
        } else {
            callback(text);
        }
    });
}
module.exports.process = process;