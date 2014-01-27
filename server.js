var express = require('express'),
	routes = require('./routes'),
	path = require('path'),
	_ = require('underscore'),
	mongoose = require('mongoose'),
	app = module.exports = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server,{ log: false }),
	Twit = require('twit'),
	twitterworker = require('./routes/twitterworker'),
	twitterapi= require('./routes/twitterapi');

var tweetStack = [];


io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
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
var env = app.get('env');

if (env === 'development') { 
	app.use(express.errorHandler()); 
	mongoose.connect('mongodb://localhost/tweety'); 
}
if (env === 'production') { 
	mongoose.connect('mongodb://lowcrow:bravo@ds027519.mongolab.com:27519/tweety'); 
};


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log('Database opened'); });

var TwitterBlock = function(){
	io.sockets.on('connection', function(socket) { _.each(tweetStack, function(t){ socket.emit('tweetmap',t); }); });

	var searchParams = { q: 'geocode:38.877831,-77.019256,0.2km', count: 100 };
	var locations = {
		DC : { locations: ['-77.222069','38.793786','-76.832489','39.030227'] },
		london : { locations: ['-0.57','51.2591','0.3407','51.743'] },
		moscow : { locations: ['37.3207','55.5167','37.9591','55.9944'] },
		cairo : { locations: ['31.118881','29.967812','31.471658','30.179214'] },
		planetEarth : { locations: ['-180','-90','180','90'] }
	}
	
	var stream = twitterworker.getStream(env,
		{ locations : 
			locations.london.locations
			.concat(locations.moscow.locations)
			.concat(locations.cairo.locations)
		});
	
	var tweetMapping = function(socketName, preserveOnServer){
		return function(tweet){
			io.sockets.emit(socketName,tweet); 
			if (preserveOnServer) {
				if (tweetStack.length > 132 ) tweetStack = tweetStack.splice(11);
				tweetStack.push(tweet);
				twitterapi.insert(tweet);
			}
		}
	}
	var tweetLogging = function(tweet){ console.log(tweet.text); }
	stream.on('tweet', tweetMapping('tweetmap',true));
}();

app.get('/', routes.index);
app.get('/api/local/:input',twitterworker.getUsersNearMe(env))
app.get('/partials/:name', routes.partials);
app.get('/api/list',twitterapi.list);
app.get('/api/list/full',twitterapi.bigList);
app.get('*', routes.index);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

