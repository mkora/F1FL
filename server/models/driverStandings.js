module.exports = (sequelize, DataTypes) =>
  sequelize.define('driverStandings', {
    driverStandingsId: {
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
  }, {
    tableName: 'driverStandings',
  });
