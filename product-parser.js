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
 

connection.connect();

var insert = function(table,data){
	var query = connection.query('INSERT IGNORE INTO '+ table +' SET ?', data, function(err, result) {
		if (err) console.log(err);
		else console.log(result);
	});	
}

var query = connection.query("select expanded_url from url where expanded_url not in ('http://Amazon.com','http://www.amazon.com/','http://www.amazon.com') and expanded_url like '%amazon.com%'", function(err, result) {
	console.log('done')
	if (err) console.log(err);
	else console.log(result);
});	

var insertProduct = function(tweet){ insert('tweet',tweet); }
