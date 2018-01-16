'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    inventory: { 
      type: DataTypes.INTEGER,
      allowNull:false
    }
  });
  
  Stock.associate = function(models) {
        // associations can be defined here
    Stock.belongsTo(models.Product, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Stock.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Stock;
};