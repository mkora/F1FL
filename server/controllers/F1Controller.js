import logger from '../utils/logger';
import db from '../models/F1Models';

class F1Controller {
  static async laps(req, res) {
    logger.debug('Controller F1, function laps called');
    const { circuitId } = req.params;
    try {
      const results = await db.Results
        .getFastestsLaps(db, circuitId);
      const data = {};
      Object.values(results).forEach((v) => {
        data[v.dataValues.year] = {
          year: v.dataValues.year,
          fastestLapTime: v.dataValues.fastestLapTime,
        };
      });
      logger.debug(data);
      return res.json({
        status: true,
        data,
      });
    } catch (error) {
      logger.error(error);
      return res.json({
        status: false,
        error,
      });
    }
  }
}

export default F1Controller;
