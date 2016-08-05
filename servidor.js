var app         = require('express')();
var express     = require('express');
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var route       = require('./routes/rutas.js');
var path        = process.cwd();
var mongoose    = require('mongoose');

require('dotenv').load(); //loading .env file
mongoose.connect(process.env.MONGO_URI); 

route(app,io); //routes

app.use(express.static(path + '/public'));
app.use('/bower_components',  express.static(path + '/bower_components'));  //files for the chart
app.use('/public/css',  express.static(path + '/public/css'));              //css files
app.use('/public/images',  express.static(path + '/public/images'));        //images files



http.listen(process.env.PORT, function(){
  console.log('listening on *:8080');
});