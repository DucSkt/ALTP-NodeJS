var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var userRouter = require("./routers/userRouter");
var questionRouter = require("./routers/questionRouter");
var eventRouter = require("./routers/eventRouter");
var roomRouter = require("./routers/roomRouter");
var examRouter = require("./routers/examRouter");
var testRouter = require("./routers/testRouter");
const socketIO = require('socket.io');
const http = require('http')
const port = 3000
var app = express();

let server = http.createServer(app)
let io = socketIO(server)

io.on('connection', (socket)=>{
    console.log('New user connected');
    //emit message from server to user
    socket.emit('newMessage', {
        from:'jen@mds',
        text:'hepppp',
        createdAt:123
    });

    // listen for message from user
    socket.on('createMessage', (newMessage)=>{
        console.log('newMessage', newMessage);
    });

    socket.on('send', (newMessage)=>{
        console.log('send', newMessage);
    });

    // when server disconnects from user
    socket.on('disconnect', ()=>{
        console.log('disconnected from user');
    });
});

server.listen(port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', testRouter);
app.use('/api', userRouter);
app.use('/api', questionRouter);
app.use('/api', eventRouter);
app.use('/api', roomRouter);
app.use('/api', examRouter);

// var connect = mongoose.connect("mongodb://localhost:27017/ALTP");
var connect = mongoose.connect("mongodb+srv://leanh:anh0944164009@cluster0-fsymw.mongodb.net/ALTP?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

app.listen(process.env.PORT || 1998, function () {
    console.log("ung dung chay tren port 1998");
});