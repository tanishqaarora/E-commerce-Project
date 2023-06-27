'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.product_category, {
        foreignKey: 'categoryId'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    rating: DataTypes.FLOAT,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return Product;
};