var querystring = require("querystring"),
fs = require("fs"),
formidable = require("formidable"),
mongodb = require("mongodb"),
mongoose = require("mongoose");

function start(response) {
	console.log("Request handler 'start' was called.");

	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" '+
		'content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" '+
		'method="post">'+
		'<input type="file" name="upload" multiple="multiple">'+
		'<input type="submit" value="Upload file" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		/* Possible error on Windows systems:
		tried to rename to an already existing file */
		fs.rename(files.upload.path, "./tmp/test.png", function(error) {
			if (error) {
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path, "./tmp/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("./tmp/test.png").pipe(response);
}

function setmemo(response){
	console.log("Request handler 'setmemo' was called.");
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" '+
		'content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/savetask" enctype="multipart/form-data" '+
		'method="post">'+
		'<input type="date" name="date"/><br/>' +
		'<input type="text" name="text"/><br/>' +
		'<input type="file" name="file" multiple="multiple"/><br/>'+
		'<input type="submit" value="Save task" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

var fields = {};
var files = {};

function savetask(response, request){
	console.log("Request handler 'savetask' was called.");

	var form = new formidable.IncomingForm();

	form
		.on('field', function(field, value){
			console.log(field, value);
      fields[field] = value;
		})
		.on('file', function(field, file) {
        //console.log(field, file);
        files[field] = file;
    })
    .on('end', function() {
			mongoose.connect('mongodb://localhost/test');
			var db = mongoose.connection;
			db.on('error', console.error.bind(console, 'connection error:'));
			db.once('open', function() {
			  // we're connected!
				console.log("we are connected");
			});

      response.writeHead(200, {'content-type': 'text/plain'});
      response.write(fields["date"]);
      response.write('\n\n');
			response.write(fields["text"]);
			response.write('\n\n');
			response.end();
    });
		form.parse(request);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.setmemo = setmemo;
exports.savetask = savetask;
