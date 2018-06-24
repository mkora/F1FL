const Sequelize = require('sequelize');

module.exports =
class Status extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        statusId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        status: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
        },
      },
      {
        tableName: 'status',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Results, { foreignKey: 'statusId' });
  }
};
