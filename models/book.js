var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var postSchema = new Schema({Title: String, Author: String, ISBN: String});

module.exports = mongoose.model('book', postSchema);