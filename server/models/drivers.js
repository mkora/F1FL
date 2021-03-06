const Sequelize = require('sequelize');

module.exports =
class Drivers extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        driverId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        driverRef: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
        },
        number: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        code: {
          type: DataTypes.STRING(3),
          allowNull: true,
        },
        forename: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
        },
        surname: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
        },
        dob: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        nationality: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        url: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
          unique: true,
        },
      },
      {
        tableName: 'drivers',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.DriverStandings, { foreignKey: 'driverId' });
    this.hasMany(models.LapTimes, { foreignKey: 'driverId' });
    this.hasMany(models.PitStops, { foreignKey: 'driverId' });
    this.hasMany(models.Qualifying, { foreignKey: 'driverId' });
    this.hasMany(models.Results, { foreignKey: 'driverId' });
  }
};
