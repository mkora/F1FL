const logger = require('../utils/logger');
const db = require('../models/index');

exports.index = async (req, res) => {
  logger.debug('Controller index, function index called');

  return res.json({
    message: 'Hello World',

  });
};
