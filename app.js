var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const checkValidate = require('./routes/checkValidate');
const crudOp = require('./routes/crudOp');
const regFormCheck = require('./routes/reg-form-check')
const showData = require('./routes/showData');
const schoolPath = require('./routes/school');
const records = require('./routes/records');
const update_auth=require('./routes/update_auth');
const adminlogin=require('./routes/adminlogin');
const authorizeLogin=require('./routes/checkValidate')
const showpath =require('./routes/showData1')
const addPath = require('./routes/addUpdates');
const aboutPath = require('./routes/about')
const mainHomePath = require ('./routes/mainHome')
const imagesPath = require('./routes/images');
const contact = require('./routes/contact')
const attendance = require('./routes/attendance');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/reg-form',crudOp)
app.post('/checkValidate',checkValidate);
app.get("/showRecord", records);
app.post('/reg-form-check',regFormCheck);
app.get('/showData', showData);
app.get('/school',schoolPath);
app.get("/updateRecord", records);
app.get("/deleteRecord", records);
app.get("/adminlogin", adminlogin);
app.post("/reg-form-check", regFormCheck);
app.post("/authorizeLogin", authorizeLogin);
app.post("/update_auth", update_auth);
app.get('/showData1',showpath);
app.get('/addUpdates',addPath)
app.get('/home',indexRouter)
app.post('/announcement', crudOp)
app.get('/about',aboutPath)
app.get('/mainHome',mainHomePath);
app.get('/images',imagesPath)
app.get('/contact',contact)
app.get('/attendance',attendance);
app.post('/attendance',attendance);
//app.post('/addUpdates',addPath)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

