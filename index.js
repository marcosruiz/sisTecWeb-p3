var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/setmemo"] = requestHandlers.setmemo;
handle["/savetask"] = requestHandlers.savetask;

server.start(router.route, handle);
