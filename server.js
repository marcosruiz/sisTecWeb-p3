var http = require("http");
var url = require("url");
var mongoose = require("mongoose");

function start(route, handle){
	function onRequest(request, response){

		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);

	}
	mongoose.connect('mongodb://localhost/notes');
	http.createServer(onRequest).listen(8888);
	console.log("Server has started on port 8888");
}

exports.start = start;
