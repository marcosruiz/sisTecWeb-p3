var http = require("http");
var url = require("url");

/*
It starts our web server on port 8888
*/
function start(route, handle){
	function onRequest(request, response){

		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);

	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started on port 8888");
}

exports.start = start;
