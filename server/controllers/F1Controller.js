import logger from '../utils/logger';
import db from '../models/F1Models';

class F1Controller {
  static async laps(req, res) {
    logger.debug('Controller F1, function laps called');
    const circuitIds = req.query.id
      .split(',')
      .map(v => parseInt(v, 10));

    try {
      const results = await db.Results
        .getFastestsLaps(db, circuitIds);
      const data = {};
      Object.values(results).forEach((v) => {
        const { dataValues } = v;
        const {
          circuitId,
          year,
          fastestLapTime,
        } = dataValues;
        if (data[circuitId] === undefined) {
          data[circuitId] = [];
        }
        data[circuitId].push({
          year,
          fastestLapTime,
          circuitId,
        });
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
