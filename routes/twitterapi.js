var Tweets = require('../models/tweetmodel.js');


var execQuery = function(q,res){
	q.exec(function (err, data) {
	  if (err) console.log(err);
	  res.send(data);
	});
}


exports.list = function(req, res) {
	var q = 
	Tweets.find({})
	.sort({'created_at':-1})
	.limit(400);
	execQuery(q,res);
}

exports.bigList = function(req, res) {
	var q = 
	Tweets.find({})
	.sort({'created_at':-1});
	//.limit(400);
	execQuery(q,res);
}

exports.insert = function(tweet){
    new Tweets(tweet).save(function(err){ if(err) console.log(err); });
};