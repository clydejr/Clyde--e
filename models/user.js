var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var postSchema = new Schema({Name: String, Email: String, Role: String, Password: String});

module.exports = mongoose.model('user', postSchema);