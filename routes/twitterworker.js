var Twit = require('twit'),
	_ = require('underscore');

var twitterCredentials = { 
	dev : { 
		consumer_key: "D8g2hursTwtrTZlgiu7JwA", 
		consumer_secret: "rPraYI7YgWPhrJJxSXtBHHXkJ0UyyooL0CxyRgCtw", 
		access_token: "339061245-ZUr76Hf6QnLt6Vq8XzqGGIpACWDSurvuMiYDuccD", 
		access_token_secret: "GG88Bjiwm378Xh5rk50VZNRiiYby6JcT0Rz8u2vB8"
	},
	prod : {
		consumer_key: "BCyDYYb6fewqNjwsS7Vmvw", 
		consumer_secret: "Sf5nFPgjTowKBoVEppzapV4fPhO12h3Rm7DU8OFiNk", 
		access_token: "2255791490-frbiM8YjUaWRatoxsb45ExL0Ojl1ioqtUjBwet0", 
		access_token_secret: "1Yd0xqPlNoCbY0VWuX1xhLie50VQiudd0vjq1ff6VMDlW"
	}
};

var getTwitterCredentials = function(env){
	if (env == 'development') return new Twit(twitterCredentials.dev);
	else return new Twit(twitterCredentials.prod);
}

exports.getStream = function (env, inputParams) {
	var T = getTwitterCredentials(env);
	return T.stream('statuses/filter', inputParams);
};

exports.getSearch = function(env, inputParams, mapFunc){
	var T = getTwitterCredentials(env);
	T.get('search/tweets', inputParams, function(err, reply) { 
		var sortedReplies = _.uniq(reply.statuses,function(item) { return item.user.id; });
		_.map(sortedReplies,function(tweet){  mapFunc(tweet); });
	});
}

exports.getUsersNearMe = function(env){
	return function(req, res) {
		var T = getTwitterCredentials(env);
		var searchParams = { q: req.params.input, count: 100 };
		T.get('search/tweets', searchParams, function(err, reply) { 
			if (err) return;
			var sortedReplies = _.uniq(reply.statuses,function(item) { return item.user.id; });
			res.send(sortedReplies);
		});
	}
}