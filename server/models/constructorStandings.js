const Sequelize = require('sequelize');

module.exports =
class ConstructorStandings extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        constructorStandingsId: {
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
          allowNull: false,
          defaultValue: '0',
        },
        position: {
          type: DataTypes.INTEGER(11),
          allowNull: true,
        },
        positionText: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        wins: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
        },
      },
      {
        tableName: 'constructorStandings',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Races, { foreignKey: 'raceId' });
    this.belongsTo(models.Constructors, { foreignKey: 'constructorId' });
  }
};
