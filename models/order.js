var mongoose = require('mongoose');

var OrderSchema = mongoose.model('Order', new mongoose.Schema({
		userId : { type : mongoose.Schema.Types.ObjectId, require : true } ,
		restaurantId : { type : mongoose.Schema.Types.ObjectId, require : true},
		items : [
			{
				itemId : { type : mongoose.Schema.Types.ObjectId, require : true },
				name : {type: String, require :true},
				image : {type : String},
				price : {type : Number, require:true},
				qty : {type : Number, require : true } 
			}
		],
		subtotal : {type : Number, require : true } ,
		tax : Number,
		total : {type : Number, require : true } ,
		status : {type : String, require : true } ,
		note :{type : String, default : '' },
		isDelete : {type : Boolean, default : false },
		createDate : {type : Date, default : Date.now },
   	    updateDate : {type : Date, default : Date.now }
	}));

var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;