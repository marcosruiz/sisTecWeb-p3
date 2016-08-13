var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		var string = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(handle, pathname, response);

		request.addListener("data", function(chunk){
		  // called when a new chunk of data was received
		  string = string + chunk;
		});

		request.addListener("end", function(){
		  // called when all chunks of data have been received
			console.log(string);
			string = "";
		});

	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started");
}

exports.start = start;
