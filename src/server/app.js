var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var path = require('path')
var connectDatabase = require('./db');

(async () => {
  try {
    const db = await connectDatabase('mongodb://localhost/test');
    console.log(`Connected to mongodb ${db.host}:${db.port}/${db.name}`);

    await server.listen(3000)
    console.log("Listen at port 3000")
  } catch (error) {
    console.error('Unable to connect to mongodb');
  }

})();

app.use(express.static(path.join(__dirname, '../..', 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

io.on('connection', socket => {
  // socket.on('get user sessions', userId => {
  //   let sessionsGrouped = await Session.aggregate({
  //     $group: { _id: "$sessionGroupId", children: { $push: "$$ROOT" }}
  //   })
  // })
})

