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
	var query = connection.query('INSERT INTO '+ table +' SET ?', data, function(err, result) {
		if (err) console.log(err);
	});	
}

var query = connection.query("select id,expanded_url from url where expanded_url not in ('http://Amazon.com','http://www.amazon.com/','http://www.amazon.com') and expanded_url like '%amazon.com%'", function(err, result) {
	if (err) console.log(err);
	else {
		var regex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");
		var asinCount= [];
		_.each(result,function(item){
			var m = item.expanded_url.match(regex);
			if (m) { 
				asinCount.push({asin: m[4], url_id: item.id });
			}
		})
		asinCount = _.countBy(asinCount,function(x){ return x.asin; })
		_.each(result,function(item){
			var m = item.expanded_url.match(regex);
			if (m) { 
				insertProduct({
					url_id: item.id,
					times_seen: asinCount[m[4]],
					first_seen: new Date(),
					last_seen: new Date(),
					asin: m[4]
				})

			}
		})
	}
});	


var insertProduct = function(product){
	insert('product',product);
}

// var insertProduct = function(product){ 
	
// 	var query = connection.query('select id from product where ?',{asin: product.asin},function(err,result){
// 		if (result){
// 			console.log(result);
// 			//console.log(result)
// 			if (result.length > 0){
// 				var updateQuery = connection.query('update product set ?, times_seen = times_seen+1 where ?',[{ last_seen: new Date() },{ id: result[0].id }],function(err,result){
// 					if (!err) console.log('updating record with no error');
// 				})
// 				//console.log(result)
// 			}
// 			else insert('product',product); 
// 		}
// 		else insert('product',product); 
// 	})
// }
