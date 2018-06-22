const Sequelize = require('sequelize');

module.exports =
class Seasons extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        year: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0',
          primaryKey: true,
        },
        url: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
          unique: true,
        },
      },
      {
        tableName: 'seasons',
        sequelize,
      },
    );
  }
};
