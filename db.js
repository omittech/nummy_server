var mongoose = require('mongoose');
//mongoose.connect('mongodb://csun:csun@ds063330.mongolab.com:63330/nummy');
mongoose.connect('mongodb://csun:csun@ds041198.mongolab.com:41198/nummy_new');
module.exports = mongoose.connection;