// Packages
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config');

// Routes
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const blogRouter = require('./routes/blogs');

// Connect mongo database
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
	useCreateIndex: true,
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
connect.then(
	() => console.log('Connected correctly to the server'),
	(err) => console.log(err)
);

// Initialize express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// App Endpoint Routes
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/blogs', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
