var mongoose = require('mongoose');

var RestaurantSchema = mongoose.model('Restaurant', new mongoose.Schema({
		name : { type : String, require : true },
		country : { type : String, require : true },
		province : { type : String, require : true },
		city : { type : String, require : true },
		address : { type : String, require : true },
		postcode : { type : String, require : true },
		location : [Number],
		dailyOrder : Number,
		popularity : Number,
		image : [String],
		description : String,
		distanceTouser : Number,
		isPublic: {type : Boolean, default : true },
		isActive : {type : Boolean, default : true },
		createDate : {type : Date, default : Date.now },
    	updateDate : {type : Date, default : Date.now }
	}));

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;