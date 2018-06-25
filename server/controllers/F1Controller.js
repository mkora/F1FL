import logger from '../utils/logger';
import db from '../models/F1Models';

class F1Controller {
  static async index(req, res) {
    logger.debug('Controller index, function index called');
    const { circuitId } = req.params;
    try {
      const result = await db.Results.getFastestsLaps(db, circuitId);
      return res.json({
        message: 'Hello World',
        result,
      });
    } catch (err) {
      logger.error(err);
      return res.json({
        message: 'Error',
        err,
      });
    }
  }
}

export default F1Controller;
