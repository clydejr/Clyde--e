var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var postSchema = new Schema({Name: String, URL: String, EmailDomain: String});

module.exports = mongoose.model('institution', postSchema);