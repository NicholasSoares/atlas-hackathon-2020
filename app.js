const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorHandler = require('./middlewares/errorHandler');
const routerInit = require('./config/routes');
const staticInit = require('./config/statics');
const sessionConfig = require('./config/session');

app.set('trust proxy', 1);

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(helmet());
app.use(compression());
app.use(session(sessionConfig));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Static files loader
staticInit.staticLoader(app);

//Routes
routerInit.routesLoader(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
