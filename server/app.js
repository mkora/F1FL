import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import dotenv from './enver'; // eslint-disable-line no-unused-vars
import logger from './utils/logger';

import F1Controller from './controllers/F1Controller';

/**
 * Express Middleware
 */
const app = express();
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
 * API routes
 */
app.get('/api/laps', F1Controller.laps);

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

export default app;
