module.exports = (sequelize, DataTypes) =>
  sequelize.define('status', {
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
  }, {
    tableName: 'status',
  });
