var mongoose = require('mongoose');

var AdminSchema = mongoose.model('Admin', new mongoose.Schema({
	username: {type: String, required: true },
	password: {type: String, required: true },
 	firstname: {type: String, required: true },
 	lastname: {type: String, required: true },	
 	isActive : {type : Boolean, default : true },
 	createDate : {type : Date, default : Date.now },
 	updateDate : {type : Date, default : Date.now },
}));

var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;