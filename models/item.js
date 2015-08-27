var mongoose = require('mongoose');

var ItemSchema = mongoose.model('Item', new mongoose.Schema({
		name : { type : String, require : true },
		restaurantId : { type : mongoose.Schema.Types.Mixed, ref: 'Restaurant'},
		picture : {type : String},
		price : {type : Number},
		description : {type : String},
		upvote : Number,
		isDelete : {type : Boolean, default : false}
	}));

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;