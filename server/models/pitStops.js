const Sequelize = require('sequelize');

module.exports =
class PitStops extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        raceId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
        },
        driverId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
        },
        stop: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
        },
        lap: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
        },
        time: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        duration: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        milliseconds: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
      },
      {
        tableName: 'pitStops',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Races, { foreignKey: 'raceId' });
    this.belongsTo(models.Drivers, { foreignKey: 'driverId' });
  }
};
