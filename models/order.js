var mongoose = require('mongoose');

var OrderSchema = mongoose.model('Order', new mongoose.Schema({
		userId : { type : mongoose.Schema.Types.Mixed, ref: 'User'},
		restaurantId : { type : mongoose.Schema.Types.Mixed, ref: 'Restaurant'},
		items : [{type: mongoose.Schema.Types.Mixed}],
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