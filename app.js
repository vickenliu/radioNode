var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const config = require(`./config/${process.env.NODE_ENV || "development"}.json`) || {};
const mongoose = require('mongoose');
const request = require('request');

// establish db connection
mongoose.connect(config.mongodb ? config.mongodb.url : process.env.MONGODB_URL);

var routes = require('./routes/index');
var users = require('./routes/users');
var collections = require('./routes/collection');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/collections', collections);

app.get('/proxy',function(req, res){
  if(req.query.url){
    Object.keys(req.query).forEach(function(key){
      if(key != 'url'){
        req.query.url += '&' + key + '=' + req.query[key] ;
      }
    });
    request(req.query.url, function(error,response){
      if(response.statusCode == 200 && !error){
        console.log(response.body)
        res.send(response.body)
      } else {
        res.status(500).send('please try again later');
      }
    })
  }else{
    res.send('pass in the url');
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
