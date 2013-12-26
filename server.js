var express = require('express'),
	routes = require('./routes'),
	path = require('path'),
	_ = require('underscore'),
	app = module.exports = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server,{ log: false }),
	Twit = require('twit'),
	twitterworker = require('./routes/twitterworker');

var tweetStack = [];


io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function(socket) { 
    _.each(tweetStack, function(t){ socket.emit('data',t); });
});

app.configure(function(){
	app.set('env','production');
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

var TwitterBlock = function(){
	var locations = {
		DC : { locations: ['-77.222069','38.793786','-76.832489','39.030227'] },
		planetEarth : { locations: ['-180','-90','180','90'] }
	}
	var stream = twitterworker.getStream(app.get('env'),locations.DC);
	var tweetMapping = function(tweet){
		io.sockets.emit('tweetmap',tweet); 
		if (tweetStack.length > 132 ) tweetStack = tweetStack.splice(11);
		tweetStack.push(tweet);
	}
	var tweetLogging = function(tweet){
		console.log(tweet.text);
	}
	//stream.on('tweet', tweetMapping);
	stream.on('tweet', tweetMapping);
}();

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('*', routes.index);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

