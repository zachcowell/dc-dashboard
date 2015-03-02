var Twit = require('twit');
var T = new Twit({consumer_key: "D8g2hursTwtrTZlgiu7JwA", consumer_secret: "rPraYI7YgWPhrJJxSXtBHHXkJ0UyyooL0CxyRgCtw", access_token: "339061245-ZUr76Hf6QnLt6Vq8XzqGGIpACWDSurvuMiYDuccD", access_token_secret: "GG88Bjiwm378Xh5rk50VZNRiiYby6JcT0Rz8u2vB8"});
var _ = require('underscore');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'links',
  user     : 'root',
  password : ''
});
var amazonAsinRegex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");

connection.connect();

var insert = function(table,data,callback){
	callback = callback || function(err,result){ console.log(result.insertId); }
	var query = connection.query('INSERT IGNORE INTO '+ table +' SET ?', data, callback);	
}

var insertTweet = function(tweet){ insert('tweet',tweet); }
var insertUser = function(user){ insert('user',user); }
var insertProduct = function(product){ insert('product',product); }
var insertUrl = function(url){ 
	var callback = function(err,result){
		var m = url.expanded_url.match(amazonAsinRegex);
		if (m){
			insertProduct({
				url_id: result.insertId,
				asin: m[4]
			})
		}
	}
	insert('url',url,callback); 
}

var searchCallback = function(tweet){
	console.log(tweet);
	var user = {
		id: tweet.user.id,
		screen_name: tweet.user.screen_name,
		name: tweet.user.name
	}

	var newTweet = {
		id: tweet.id,
		text: tweet.text,
		user_id: tweet.user.id,
		created_on: new Date(tweet.created_at)
	}
	
	insertUser(user);
	insertTweet(newTweet);

	_.each(tweet.entities.urls, function(url){
		var newURL = {
			tweet_id: tweet.id,
			url: url.url,
			display_url: url.display_url,
			expanded_url: url.expanded_url
		}
		insertUrl(newURL);
	})
}

var stream = T.stream('statuses/filter', { track: 'amazon.com' })
stream.on('tweet', searchCallback);

// T.get('search/tweets', { q: 'amazon.com', count: 10 }, function(err, data, response) {
//   _.each(data.statuses,searchCallback);
// })