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



app.configure(function(){
	app.set('env','development');
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(app.router);
});
var env = app.get('env');

if (env === 'development') { app.use(express.errorHandler()); }
if (env === 'production') { };

var TwitterBlock = function(){
	io.sockets.on('connection', function(socket) { _.each(tweetStack, function(t){ socket.emit('tweetmap',t); }); });

	var searchParams = { q: 'geocode:38.877831,-77.019256,0.2km', count: 100 };
	var locations = {
		DC : { locations: ['-77.222069','38.793786','-76.832489','39.030227'] },
		planetEarth : { locations: ['-180','-90','180','90'] }
	}
	
	var stream = twitterworker.getStream(env,locations.DC);
	
	var tweetMapping = function(socketName, preserveOnServer){
		return function(tweet){
			io.sockets.emit(socketName,tweet); 
			if (preserveOnServer) {
				if (tweetStack.length > 132 ) tweetStack = tweetStack.splice(11);
				tweetStack.push(tweet);
			}
		}
	}
	var tweetLogging = function(tweet){ console.log(tweet.text); }
	stream.on('tweet', tweetMapping('tweetmap',true));
}();

app.get('/', routes.index);
app.get('/api/local/:input',twitterworker.getUsersNearMe(env))
app.get('/partials/:name', routes.partials);
app.get('*', routes.index);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

