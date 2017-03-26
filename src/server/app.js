var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path')

app.use(express.static(path.join(__dirname, '..', 'client/dist')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

server.listen(3000);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  })
})