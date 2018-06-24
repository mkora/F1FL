const Sequelize = require('sequelize');

module.exports =
class Races extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        raceId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        year: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        round: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        circuitId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: '0000-00-00',
        },
        time: {
          type: DataTypes.TIME,
          allowNull: true,
        },
        url: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: true,
        },
      },
      {
        tableName: 'races',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Circuits, { foreignKey: 'circuitId' });
    this.hasMany(models.ConstructorResults, { foreignKey: 'raceId' });
    this.hasMany(models.ConstructorStandings, { foreignKey: 'raceId' });
    this.hasMany(models.DriverStandings, { foreignKey: 'raceId' });
    this.hasMany(models.LapTimes, { foreignKey: 'raceId' });
    this.hasMany(models.PitStops, { foreignKey: 'raceId' });
    this.hasMany(models.Qualifying, { foreignKey: 'raceId' });
    this.hasMany(models.Results, { foreignKey: 'raceId' });
  }
};
