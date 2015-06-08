var Item = require('../models/item');
var fs = require('fs');

//POST: Create a new Item 
exports.create = function (req, res){
	var item = new Item(req.body);
	item.save(function(err,result){
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

//POST: Edit a item 
exports.edit = function(req,res) {
	var item = new Item(req.body);
	Item.update({_id : item._id}, item, function(err, result){
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

//GET Item 
exports.get = function(req,res){
	var id = req.params.id;
	Item.find({_id:id},function(err, result){
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

//GET Items by restaurantId
exports.getByRestaurantId = function (req,res) {
	var id = req.params.id;
	Item.find({restaurantId:id},function(err, result){
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

//DELETE 
exports.delete = function(req,res) {
	var id = req.params.id;
	Item.remove({_id:id}, function(err){
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
	})
}




















