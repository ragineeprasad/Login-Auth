var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');

var userController = require('./routes/user')

var app = express();

// add mongoose 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27018/Login', { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(!err){
        console.log('MongoDb connection succeded...')
    }else{
        console.log('Error in DB connection: '+ JSON.stringify(err, undefined , 2));
    }
})

app.use(cors());
app.use(bodyParser.json());

app.listen(3001 , () => console.log('Server started at port : 3000'));

app.use('/', userController)

