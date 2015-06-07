var mongoose = require('mongoose');

var ForgetpasswordcodeSchema = mongoose.model('Forgetpasswordcode', new mongoose.Schema({
		username : { type : String, require : true },
		code : { type : String, require : true},
		isActive : {type : Boolean, default : false}
	}));

var Forgetpasswordcode = mongoose.model('Forgetpasswordcode', ForgetpasswordcodeSchema);
module.exports = Forgetpasswordcode;