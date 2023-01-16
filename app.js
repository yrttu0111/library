var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);



const routers = require('./routes');
var indexRouter = require('./routes/index');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var options = {
  host: "localhost",
  port: 3306,
  user: "jaemin",
  password: "ASDasd123!",
  database: "library",
};



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret@1234'));
var sessionStore = new MySQLStore(options);


app.use(session({
  secret : 'secret@1234', // 암호화때 사용할 비밀 번호
  resave:false,           // 새로운 요청시 세션에 변동 사항이 없어도 다시 저장할지 설정
  saveUninitialized : true, // 세션에 저장할 내용이 없어도 저장할지 설정
  store: sessionStore,
  cookie:{ 
    httpOnly:true, // 클라어언트 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록함.
    maxAge:1000 * 60 * 30, // 타임아웃 설정. ms 단위
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


//swagger
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api',routers);

const { swaggerUi, specs } = require("./swagger/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
