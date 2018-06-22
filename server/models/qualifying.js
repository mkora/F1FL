const Sequelize = require('sequelize');

module.exports =
class Qualifying extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        qualifyId: {
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
          allowNull: false,
          defaultValue: '0',
        },
        position: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        q1: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        q2: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        q3: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        tableName: 'qualifying',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Races);
    this.belongsTo(models.Drivers);
    this.belongsTo(models.Constructors);
  }
};
