var mongoose = require('mongoose');

var RestaurantSchema = mongoose.model('Restaurant', new mongoose.Schema({
		name : { type : String, require : true },
		phone : { type : String, require : true },
		address : { type : String, require : true },
		city : { type : String, require : true },
		upvote : Number,
		about : String,
		latitude : Number,
		longitude : Number,
		picture : String,
		dailyOrder : Number,
		items : [{type: mongoose.Schema.Types.Mixed, ref: 'Item'}],
		isActive : {type : Boolean, default : true },
		isPublic: {type : Boolean, default : true },
		createDate : {type : Date, default : Date.now },
    	updateDate : {type : Date, default : Date.now }
	}));

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;