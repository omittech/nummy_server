var mongoose = require('mongoose');

var ItemSchema = mongoose.model('Item', new mongoose.Schema({
		name : { type : String, require : true },
		restaurantId : { type : mongoose.Schema.Types.ObjectId, require : true},
		image : {type : String},
		price : {type : Number},
		description : {type : String},
		popularity : {type : Number, default : 0},
		isHot : {type :Boolean, default : false},
		isDelete : {type : Boolean, default : false}
	}));

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;