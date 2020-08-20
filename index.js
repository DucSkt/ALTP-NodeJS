var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var userRouter = require("./routers/userRouter");
var questionRouter = require("./routers/questionRouter");
var eventRouter = require("./routers/eventRouter");
var roomRouter = require("./routers/roomRouter");
var examRouter = require("./routers/examRouter");
var testRouter = require("./routers/testRouter");
var roomAwaitRouter = require("./routers/roomAwaitRouter");
var app = express();
const socketIO = require('socket.io');
const http = require('http')
const port = 3000

let server = http.createServer(app)
const io = socketIO(server)
require('./middleware/socket')(io);

server.listen(port);
app.set('socketio', io);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', testRouter);
app.use('/api', userRouter);
app.use('/api', questionRouter);
app.use('/api', eventRouter);
app.use('/api', roomRouter);
app.use('/api', examRouter);
app.use('/api', roomAwaitRouter);

// var connect = mongoose.connect("mongodb://localhost:27017/ALTP");
var connect = mongoose.connect("mongodb+srv://ducskt:nVYREW37ddBh7eCr@cluster0.p7app.mongodb.net/ALTP",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

app.listen(process.env.PORT || 1998, function () {
    console.log("ung dung chay tren port 1998");
});