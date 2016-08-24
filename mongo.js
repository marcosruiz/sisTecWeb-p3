var mongodb = require('mongodb');
var mongoose = require('mongoose');


module.exports = mongoose.model('Note', {date: String, text: String});
