'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
                isEmail: true
      }
    },
    password: DataTypes.STRING
  });
  
  User.associate = function(models) {
    User.hasMany(models.Product);
    User.hasMany(models.Stock);
  }
  return User;
};