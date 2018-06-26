const Sequelize = require('sequelize');

module.exports =
class Results extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        resultId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        raceId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        driverId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        constructorId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        number: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        grid: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        position: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        positionText: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
        },
        positionOrder: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        points: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: '0',
        },
        laps: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        time: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        milliseconds: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        fastestLap: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        rank: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
          defaultValue: '0',
        },
        fastestLapTime: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        fastestLapSpeed: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        statusId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
      },
      {
        tableName: 'results',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Races, { foreignKey: 'raceId' });
    this.belongsTo(models.Drivers, { foreignKey: 'driverId' });
    this.belongsTo(models.Constructors, { foreignKey: 'constructorId' });
    this.belongsTo(models.Status, { foreignKey: 'statusId' });
  }

  static getFastestsLaps(models, circuitIds) {
    return this.findAll({
      attributes: [
        [Sequelize.col('Race.year'), 'year'],
        [Sequelize.col('Race.circuitId'), 'circuitId'],
        [Sequelize.fn('MIN', Sequelize.col('fastestLapTime')), 'fastestLapTime'],
      ],
      include: [{
        attributes: [],
        model: models.Races,
        where: {
          circuitId: {
            [Sequelize.Op.in]: circuitIds,
          },
        },
      }],
      group: [Sequelize.col('Race.year'), Sequelize.col('Race.circuitId')],
      having: {
        fastestLapTime: {
          [Sequelize.Op.ne]: null,
        },
      },
      order: [[Sequelize.col('Race.year'), 'ASC']],
      logging: ((process.env.LOG_LEVEL === 'debug')
        ? console.log : false),
    });
  }
};
