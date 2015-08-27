var Order = require('../models/order');
var mongoose = require('mongoose');

//POST : Create a new Order
exports.create = function (req,res) {
	var order = new Order(req.body);
	order.userId = mongoose.Types.ObjectId(order.userId);
	order.restaurantId = mongoose.Types.ObjectId(order.restaurantId);
	order.save(function(err,result){
		if(err){
			res.json({
				status :'fail',
				message : err,
				data :null
			});
		}
		else {
			res.json({
				status:'ok',
				message : 'success',
				data:result
			});
		}		
	});
}

//GET Order 
exports.get = function(req,res){
	var id = req.params.id;
	Order.findOne({_id:id}).populate('userId').populate('restaurantId').exec(function(err, result){
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

//POST: Update Order
exports.edit = function(req, res){
	var order = new Order(req.body);
	Order.update({_id : order._id}, order, function(err, result){
		if(err){
			res.json({
				status :'fail',
				message : err,
				data :null
			});
		}
		else {
			res.json({
				status:'ok',
				message : 'success',
				data:result
			});
		}		
	});
}

//GET : 
exports.getOrdersByUserId = function(req,res){
	var id = req.params.id;
	Order.find({userId:id},function(err, result){
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