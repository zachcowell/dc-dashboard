var Twit = require('twit');

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

exports.getStream = function (env) {
	var T;
	if (env == 'development') T = new Twit(twitterCredentials.dev);
	else T = new Twit(twitterCredentials.prod);
	var DC = ['-77.222069','38.793786','-76.832489','39.030227']; //setup DC bounding box
	return T.stream('statuses/filter', { locations: DC });
};