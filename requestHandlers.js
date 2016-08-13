var querystring = require("querystring"),
fs = require("fs"),
formidable = require("formidable");

function start(response) {
	console.log("Request handler 'start' was called.");

	exec("dir", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<form method='post'>");
	response.write("<textarea type='text' name='data' cols='50' rows='10'></textarea>");
	response.write("<br/>");
	response.write("<button type='submit'>Send</button>");
	response.write("</form>");
	response.end();
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("./tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
