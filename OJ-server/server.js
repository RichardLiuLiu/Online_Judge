const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
var socketIO = require('socket.io');
var io = socketIO();
var editorSocketService = require('./services/editorSocketService')(io);

const restRouter = require('./routes/rest');

const mongoose = require('mongoose');
mongoose.connect('mongodb://richard:richard@ds125068.mlab.com:25068/oj-problems');

app.use('/api/v1', restRouter);
app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', onListening);

function onListening() {
    console.log('App listening on port 3000!') 
}

app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});
