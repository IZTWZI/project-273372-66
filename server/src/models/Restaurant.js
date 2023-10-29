module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    timeOn: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    timeOff: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    menuType: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    services: DataTypes.STRING(255),
    promotion: DataTypes.STRING(255)
  },)
  Restaurant.associate = function (models) { }
  return Restaurant
}