import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import logger from '../utils/logger';

/**
 * Load DB Modules
 *
 * @param {*} sequelize
 */
const init = (sequelize) => {
  const basename = path.basename(__filename);

  const models = fs
    .readdirSync(__dirname)
    .filter(file =>
      (file.indexOf('.') !== 0)
      && (file !== basename)
      && (file.slice(-3) === '.js'))
    .map((file) => {
      // eslint-disable-next-line
      const model = require(path.join(__dirname, file));
      return {
        [model.name]: model.init(sequelize, Sequelize),
      };
    });

  Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

  return models;
};

/**
 * DB Connect
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

try {
  (async () => {
    await sequelize.authenticate();
    logger.debug('Connection has been established successfully');
  })();
} catch (err) {
  logger.error('Unable to connect to the database:', err);
}

const models = init(sequelize);

export default{
  ...models,
  sequelize,
};
