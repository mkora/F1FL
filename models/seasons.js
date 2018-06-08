module.exports = (sequelize, DataTypes) =>
  sequelize.define('seasons', {
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
  }, {
    tableName: 'seasons',
  });
