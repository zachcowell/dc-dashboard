var Tweets = require('../models/tweetmodel.js');

exports.list = function(req, res) {
	Tweets.find({  }, function (err, data) {
	  if (err) return handleError(err);
	  res.send(data);
	})
}