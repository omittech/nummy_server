var Restaurant = require('../models/restaurant');
var Item = require('../models/item');
var async = require('async');


//POST: Create a new restaurant 
exports.create = function (req, res){
	var restaurant = new Restaurant(req.body);
	restaurant.items =[];
	var items = req.body.items;
	async.each(items, function(item, callback){
		var itemObj = new Item(item);
		itemObj.save(function(err,item_result){
			if(err){
				res.json({
					status :'fail',
					message : err,
					data :null
				});
			}
			else {
				restaurant.items.push(item_result._id);
				callback();
			}
		});
	},
	function(err){
		restaurant.save(function(err,result){
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
	});

}

//GET
exports.get = function(req,res){
	var id = req.params.id;
	if(id !=null){
		Restaurant.find({_id:id}).populate("items").exec(function(err, result){
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
		Restaurant.find({},function(err, result){
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

//POST
exports.edit = function(req,res){
	var restaurant = new Restaurant(req.body);
	Restaurant.update({_id:restaurant._id}, restaurant, function(err,result){
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
	Restaurant.remove({_id:id}, function(err){
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

function cal_distance(point, lat2, lon2) {
	 var lat1 = point[1];
	 var lon1 = point[0];
	 var radlat1 = Math.PI * lat1/180;
	 var radlat2 = Math.PI * lat2/180;
	 var radlon3 = Math.PI * lon1/180;
	 var radlon4 = Math.PI * lon2/180;
	 var radtheta = lon1 -lon2;
	 var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344;
	return dist;
}

//GET near restaurants 
exports.getNearRestaurants = function (req,res){
	var lng = req.params.lng, 
	lat = req.params.lat,
	distance = req.params.distance;
	var radian = distance/6371;

	Restaurant.find({location : {$near: [lng,lat], $maxDistance : radian}},function(err,result){
		if(err) {
			res.json({
				status:'fail',
				message: err,
				data : null
			});	
		}
		else {
			var returnList = [];
			async.forEach(result, function(item, callback){
				var loc = item.location;
				var distance = cal_distance(loc, lat,lng);
				item.distanceTouser = distance;
				returnList.push(item);
				callback();
			},function(err){
				res.json({
					status:'ok',
					message:'success',
					data:returnList
				});
			}); 
		}
	});
}





























