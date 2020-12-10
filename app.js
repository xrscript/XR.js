// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res,next) {
	res.sendFile(__dirname + '/index.html');
});
// app.js

var roomno = 1;
io.on('connection', function(client) {
	
	//client.join("room-"+roomno);
	console.log('Client connected...');
	//client.join('some room');
	
	console.log('yoyoyo')
	client.on('yo', function(data) {
	
		client.emit('broad', data);
		client.broadcast.emit('broad',data);
		//console.log(data)
	});
	client.on('join', function(data) {
		
		
		
		
		
		
		//scene.add()
		console.log(data);
		client.on('say to someone', (id, msg) => {
		   client.to(id).emit('broad', msg);
		 });
		client.on('messages', function(data) {
			var options = {
		 text:data,
		 size: 0.4,
		 color: (Math.random() * 0xffffff),
		 position:[randomInRange(0,10)-5,randomInRange(0,10)-5,randomInRange(0,10)-5],
		 rotation:[randomInRange(0,2)-1,randomInRange(0,2)-1,randomInRange(0,2)-1],
		 }

			client.emit('broad', options);
			client.broadcast.emit('broad',options);
			//console.log(data)
		});
		
	});
	
	
	client.broadcast.emit('broad','poop');
});
server.listen(4000);
io.to('some room').emit('some event');
function randomInRange(min, max) {
  return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
}
