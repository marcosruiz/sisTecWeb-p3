var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var task = mongoose.Schema({
  date: String,
  text: String,
  file: String
})

module.exports = task;
