const Sequelize = require('sequelize');

module.exports =
class LapTimes extends Sequelize.Model {
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
        lap: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
        },
        position: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        time: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        milliseconds: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
      },
      {
        tableName: 'lapTimes',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Races, { foreignKey: 'raceId' });
    this.belongsTo(models.Drivers, { foreignKey: 'driverId' });
  }
};
