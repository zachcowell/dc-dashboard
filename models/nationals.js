var mongoose = require('mongoose')
   ,Schema = mongoose.Schema;
 
var nationalNameSchema = mongoose.Schema({
    year: Number,
    name: String,
    name_lower: String,
    gender: String,
    occurrences: Number,
    rank: Number
}, {collection: 'national' });


module.exports = mongoose.model('National', nationalNameSchema);