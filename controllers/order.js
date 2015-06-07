var Order = require('../models/order');

//POST : Create a new Order
exports.create = function (req,res) {
	var order = new Order(req.body);
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
	Order.find({_id:id},function(err, result){
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