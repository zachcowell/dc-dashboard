var mysql      	= require('mysql');
var _ 			= require('underscore');

var sourceConnection = mysql.createConnection({
  host     : 'localhost',
  database : 'links',
  user     : 'root',
  password : ''
});

var destinationConnection = mysql.createConnection({
  host     : 'localhost',
  database : 'stageLinks',
  user     : 'root',
  password : ''
});

sourceConnection.connect();
destinationConnection.connect();

var query = sourceConnection.query('select p.asin "product_asin", t.id "tweet_id", usr.id "user_id", t.text "tweet_text", t.created_on "tweet_created_on", usr.screen_name "user_screen_name", usr.name "user_name"from product p inner join url u on p.url_id = u.id inner join tweet t on t.id = u.tweet_id inner join user usr on usr.id = t.user_id', function(err,result){
	if (err) console.log(err);
	else {
		var productArray = [];
		_.each(result,function(item){
			productArray.push([
				item.product_asin,
				item.tweet_id,
				item.user_id,
				item.tweet_text,
				item.tweet_created_on,
				item.user_screen_name,
				item.user_name
			]);
		});

		var uploadQuery = destinationConnection.query('INSERT INTO product (product_asin,tweet_id,user_id,tweet_text,tweet_created_on,user_screen_name,user_name) VALUES ?', [productArray], function(err,result){
			if (err) console.log(err);
			else console.log('data upload complete.');
		});
	}
});	

