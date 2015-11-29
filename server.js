// Create a EJS object
var ejs = require('ejs');
// Create a Express JS server object
var express = require('express');
//Initialize the express application
var app = express();
//Create the server using http
var server = require('http').Server(app);
// Create a socket.io object
var io = require('socket.io').listen(server);

// Set the parameters for the express application
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set("view options", { layout: false });
app.set('port', 3000);  
app.set('ipaddr', "127.0.0.1");
app.use(express.static(__dirname + '/public'));
app.engine('html', ejs.renderFile);

// Define a route for GET request from the client to server root
app.get('/', function(req, res){
  res.render('index.html');
});

// Begin accepting connections at ipaddr and port
server.listen(app.get('port'), app.get('ipaddr'), function(){
	console.log('Express server listening on IP ' + app.get('ipaddr') + ' and port ' + app.get('port'));
});

var pos = []
pos[0] =  { x: 200, y: 400 }
pos[1] = { x: 800, y: 300} 

var count = 0;

// VERY IMPORTANT FUNCTION BELOW
// Function to handle client socket events
io.on('connection',function(socket){
	console.log("A user connected");
	
	socket.on('enterGame', function() {
		socket.emit('initialPosition', pos[count++]);
	});

	//TODO: Handling client events will largely be implemented here
	socket.on('createPlayerReq',function(){
		console.log("Received createPlayerReq");
		io.to(socket.id).emit('createPlayerResp',++num);
	});
	socket.on('sendPosition',function(pos){
		socket.broadcast.emit('updateEnemy',pos);
	});

	socket.on('disconnect',function(){
		console.log("A user disconnected");
	});
});