var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
// var io = require('../..')(server);
var io = require('socket.io')(server);

// Routing
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
    var user = Date.now();

    socket.on('message.sent', function (message) {
        io.emit('message', user + ': ' + message);
    });

    io.emit('message ', 'User' + user + ' connected');
});

server.listen(3000, function () {
    console.log('Started server');
});