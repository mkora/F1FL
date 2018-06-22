const Sequelize = require('sequelize');

module.exports =
class Constructors extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        constructorId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        constructorRef: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
          unique: true,
        },
        nationality: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        url: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
        },
      },
      {
        tableName: 'constructors',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.ConstructorResults);
    this.hasMany(models.ConstructorStandings);
    this.hasMany(models.Qualifying);
    this.hasMany(models.Results);
  }
};
