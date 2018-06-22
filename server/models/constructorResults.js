const Sequelize = require('sequelize');

module.exports =
class ConstructorResults extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        constructorResultsId: {
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
        constructorId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
        points: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        tableName: 'constructorResults',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Races);
    this.belongsTo(models.Constructors);
  }
};
