var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var userRouter = require("./routers/userRouter");
var questionRouter = require("./routers/questionRouter");
var eventRouter = require("./routers/eventRouter");
var roomRouter = require("./routers/roomRouter");
var examRouter = require("./routers/examRouter");


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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