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
        const { fastestLapTime } = v;
        const year = v.get('year');
        const circuitId = v.get('circuitId');
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

  static async circuits(req, res) {
    logger.debug('Controller F1, function circuits called');
    try {
      const results = await db.Circuits.findAll();
      const data = [];
      Object.values(results).forEach((v) => {
        data.push({
          circuitId: v.circuitId,
          name: v.getFullName(),
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
