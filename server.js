var express = require('express'),
	routes = require('./routes'),
	socketIo = require('socket.io'),
	fs = require('fs'),
	http = require('http'),
	path = require('path'),
	_ = require('underscore'),
	app = module.exports = express(),
	server = http.createServer(app),
	io = socketIo.listen(server,{ log: false }),
	Twit = require('twit');

var tweetStack = [];


io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function(socket) { 
    _.each(tweetStack, function(t){ socket.emit('data',t); });
});


var TwitterWorker = function () {
	fs.readFile('./misc/twitter-credentials.json', 'utf8', function (err, data) { 
		var credentials = JSON.parse(data); 
		var T = new Twit(credentials);
		var DC = ['-77.222069','38.793786','-76.832489','39.030227']; //setup DC bounding box
		var motown = ['-80.5155','39.1961','-79.2835','39.9767'];
		var stream = T.stream('statuses/filter', { locations: DC })
		stream.on('tweet', function (tweet) { 
			io.sockets.emit('data',tweet); 
			if (tweetStack.length > 132 ) tweetStack = tweetStack.splice(11);
			tweetStack.push(tweet);
		});
	});
}();

app.configure(function(){
	app.set('port', process.env.PORT || 5000);
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
//app.get('*', routes.index);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

