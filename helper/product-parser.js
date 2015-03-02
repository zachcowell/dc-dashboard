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

var insert = function(table,data){
	var query = connection.query('INSERT INTO '+ table +' SET ?', data, function(err, result) {
		if (err) console.log(err);
	});	
}

var insertProduct = function(product){
	insert('product',product);
}

var query = connection.query("select id,expanded_url from url where expanded_url not in ('http://Amazon.com','http://www.amazon.com/','http://www.amazon.com') and expanded_url like '%amazon.com%'", function(err, result) {
	_.each(result,function(item){
		var m = item.expanded_url.match(amazonAsinRegex);
		if (m){
			insertProduct({
				url_id: item.id,
				asin: m[4]
			})
		}	
	})
	console.log('Done inserting');
});	

