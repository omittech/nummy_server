var fs = require('fs');


exports.getImage =function(req,res){
	var path = "images/" + req.params.path;
	fs.stat(path, function(err, stat){
		if(err) {}
		else {
			var img = fs.readFileSync(path);
			res.contentType = 'image/png';
			res.contentLength = stat.size;
			res.end(img, 'binary');
		}
	});
}