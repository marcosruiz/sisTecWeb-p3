var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var mysql = require("mysql");
var nodeglob = require("node-glob");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "notes"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/setmemo"] = requestHandlers.setmemo;
handle["/savetask"] = requestHandlers.savetask;
handle["/showallmemo"] = requestHandlers.showallmemo;
handle["/showmemo"] = requestHandlers.showmemo;

server.start(router.route, handle);

exports.con = con;
