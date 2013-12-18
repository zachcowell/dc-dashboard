var mongoose = require('mongoose')
   ,Schema = mongoose.Schema;
 
var tweetNameSchema = mongoose.Schema({
    name: String,
    text: String
}, {collection: 'tweetcol' });


module.exports = mongoose.model('Tweet', tweetNameSchema);