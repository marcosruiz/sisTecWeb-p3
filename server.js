var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk){
		  // called when a new chunk of data was received
		  postData = postData + postDataChunk;
		});

		request.addListener("end", function(){
		  // called when all chunks of data have been received
			route(handle, pathname, response, postData);
		});

	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started on port 8888");
}

exports.start = start;
