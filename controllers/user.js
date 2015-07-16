var User = require("../models/user");
var Token = require('../models/token');
var Code = require('../models/forgetpasswordcode');
var crypto = require('crypto');
var session = require('express-session');
var crypt = "secret";

exports.get = function (req, res){
	var id = req.params.id;
	if(id !=null){
		User.find({_id:id},function(err, result){
			if(err){
				res.json({
					status:'fail',
					message: err,
					data : null
				});	
			}
			else {
				res.json({
					status:'ok',
					message:'success',
					data:result[0]
				});
			}
		});
	}
	else {
		User.find({},function(err, result){
			if(err){
				res.json({
					status:'fail',
					message: err,
					data : null
				});	
			}
			else {
				res.json({
					status:'ok',
					message:'success',
					data:result
				});
			}
		});
	}
}

exports.create = function(req,res){
	var user = new User(req.body);
	//Check if username is exist
	User.findOne({username : user.username}, function(err,result){
		if(result){
			res.json({
				status:'fail',
				message : 'username is exist',
				data : null
			});
		}
		else {
			user.password = crypto.createHash('sha256').update(user.password).digest("hex"); 
			user.save(function(err, result){
				if(err){
					res.json({
						status: 'fail',
						message: err,
						data : null
					});
				}
				else {
					res.json({
						status:'ok',
						message:'success',
						data:result	
					});
				}
			});
		}
	});
}

exports.edit = function(req,res){
	var id = req.params.id;
	User.update({_id:id}, req.body, function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {
			if(result == 1){
				res.json({
					status: 'ok',
					messages: 'successed',
					data: result[0]
				});	
			}else{
				res.json({
					status: 'fail',
					messages: "multipulte result",
					data: null
				});
			}
		}
	});
}

exports.login = function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	User.find({
		username: username
	}, function(err, results) {
		if (err) {
			throw err;
		}
		if (results.length > 0) {
			var user = results[0];
			var encryptedPassword = user.password;
			var decryptedPassword = crypto.createHash('sha256').update(password).digest("hex"); 
			if (encryptedPassword == decryptedPassword) {
				Token.find({user: user._id}, function(err, result){

				}).remove(function(err,result){
					if(err) {
						res.json({
							status: 'fail',
							messages: 'can not remove old session data',
							data : null
						});
					}
					//Create a new Token
					var token = new Token();
					token.user = user._id;
					token.type = "User";
					token.save();
					
					res.json({
					status:'ok',
					message : 'success',
					data : {id : user.id,
							username : user.username,							
							token: token.id
						}
				});
				})
			}
			else res.json({
				status:'fail',
				message : 'incorrect password',
				data : null
			});
		}
		else res.json({
			status:'fail',
			message : 'no user',
			data : null
		});
	});
}

exports.logout = function(req,res){
	// remove old token data for the current found user
	Token.find({user:sessionStorage.token}, function(err, result){	
		 if(err) console.log(err);

	}).remove(function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: 'can not remove old session data',
				data : null
			});
		}
	});
}

exports.request_forgetpassword = function(req,res){
	var username = req.body.username;

	//Should be generate a ramdom code, then Email or Phone send it to user.
	//Now there is hard code
	var code = new Code({
						username : username,
						code : "1234"
						});
	code.save(function(err, result){
				if(err){
					res.json({
						status: 'fail',
						message: err,
						data : null
					});
				}
				else {
					res.json({
						status:'ok',
						message:'success',
						data:result	
					});
				}
			});
}

exports.retrieve_password = function (req,res){
	var username = req.body.username;
	var code = req.body.retrieve_code;
	var newpassword = req.body.newpassword;
	var re_newpassword = req.body.re_newpassword;
	if(newpassword != re_newpassword) {
		res.json({
			status :'fail',
			message : 'password is not same',
			data :null
		});
	}
	else {
		Code.findOne({username : username, code : code, isActive : true}, function (req, res){
			if(err) {
				res.json({
					status: 'fail',
					message: err,
					data : null
				});
			}
			else {
				var new_password = crypto.createHash('sha256').update(newpassword).digest("hex");

				User.update({username : username},{$set: {password: new_password}}, function(req,res){
					if(err){
						res.json({
							status: 'fail',
							message: err,
							data : null
						});
					}
					else {
						Code.delete({username : username}, function(req, res){
							if(err){
								res.json({
									status: 'fail',
									message: err,
									data : null
								});
							}
							else {
								res.json({
									status:'ok',
									message:'success',
									data:null	
								});
							}
						});
					}
				});
			}
		});
	}
}


exports.cleanupToken = function() {
	console.log('got here');
	// Token.remove({}, function(err){
	// 	if(err){
	// 		console.log('Token clean up occur error');
	// 	}
	// 	else {
	// 		console.log('Token clean up success');
	// 	}

	// });
}














