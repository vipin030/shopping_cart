'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: DataTypes.STRING
  });

  Product.associate = function(models) {
    Product.hasOne(models.Stock, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
    Product.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Product;
};