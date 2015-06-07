var mongoose = require('mongoose');

var UserSchema = mongoose.model('User', new mongoose.Schema({
	username: {type: String, required: true },
	password: {type: String, required: true },
	firstname: {type: String, required: true },
	lastname: {type: String, required: true },
	phone : String,
	email : String,
	birthday : {type : Date, default : null},
	isBusiness : {type : Boolean, default : false},
	isActive : {type : Boolean, default : true },
	isDelete : {type : Boolean, default : false },
	createDate : {type : Date, default : Date.now },
    updateDate : {type : Date, default : Date.now },
}));

var User = mongoose.model('User', UserSchema);
module.exports = User;
