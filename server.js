var express = require('express'),
	mongoose = require('mongoose'),
	routes = require('./routes'),
	//api = require('./routes/api.js'),
	http = require('http'),
	path = require('path'),
	app = module.exports = express(),
	util = require('util'),
	Twit = require('twit'),
	Instagram = require('instagram-node-lib');
/*
var InstagramWorker = function (){
	Instagram.set('client_id', '37e6d024fbce47cdbf2cb093d9968dee');
	Instagram.set('client_secret', '81b6826cd6af43aebb4906294c5bf9b4');
	Instagram.set('callback_url', 'http://www.zachcowell.com');
	Instagram.subscriptions.subscribe({
	  object: 'tag',
	  object_id: 'lol',
	  aspect: 'media',
	  callback_url: 'http://www.zachcowell.com',
	  type: 'subscription',
	  id: '#'
	});
}();
*/
var TwitterWorker = function () {
	var T = new Twit({ consumer_key:'D8g2hursTwtrTZlgiu7JwA', consumer_secret:'rPraYI7YgWPhrJJxSXtBHHXkJ0UyyooL0CxyRgCtw', access_token:'339061245-ZUr76Hf6QnLt6Vq8XzqGGIpACWDSurvuMiYDuccD', access_token_secret:'GG88Bjiwm378Xh5rk50VZNRiiYby6JcT0Rz8u2vB8'});
	var DC = ['-77.222069','38.793786','-76.832489','39.030227'];
	var stream = T.stream('statuses/filter', { locations: DC })
	stream.on('tweet', function (tweet) {
	  var user = tweet.user.screen_name;
	  var txt = tweet.text;
	  console.log('<'+user + '>: ' + txt);
	});
}();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(app.router);
});

if (app.get('env') === 'development') { app.use(express.errorHandler()); }
if (app.get('env') === 'production') { };

app.get('/', routes.index);
app.get('*', routes.index);/*
app.get('/callback', function(req, res){
    var handshake =  Instagram.subscriptions.handshake(req, res);
});*/
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});