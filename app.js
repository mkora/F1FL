const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

/**
 * Load environment variables from .env file
 * where API keys and passwords are configured
 */
dotenv.load({
  path: '.env',
});

const logger = require('./utils/logger');

/**
 * Controllers (route handlers)
 */
const indexController = require('./controllers/index');

/**
 * Create Express server
 */
const app = express();

/**
 * Configure Express
 */
app.set('port', process.env.PORT || 3030);
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors({
  exposedHeaders: ['Link'],
}));
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/build'));
}

/**
 * Connect to MySQL
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    logging: false,
    freezeTableName: true,
    operatorsAliases: false,
  },
);
sequelize
  .authenticate()
  .then(() => {
    logger.debug('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

/**
 * Test app
 */
app.get('/pulse', (req, res) => {
  logger.debug('It works!');
  res.status(200);
  // send json
  return res.json({
    ok: true,
    data: 'It works!',
  });
});

/**
 * API examples routes
 */
app.get('/api/index', indexController.index);

/**
 * Error Handler
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(errorHandler({
  log: (err, str, req, res) => {
    logger.error(str, err, req);
    res.status(err.code || 500);
  },
}));

module.exports = app;
