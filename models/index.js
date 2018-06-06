const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db = {};

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

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
