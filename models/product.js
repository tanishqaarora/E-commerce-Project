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
      Product.belongsTo(models.cart, {
        foreignKey: 'productId'
      });
      Product.hasMany(models.product_feature, {
        foreignKey: 'productId'
      });
      Product.belongsToMany(models.feature_attribute, {
        through: models.product_feature,
        foreignKey: 'productId'
      })
    }
  }
  Product.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.FLOAT,
    rating: DataTypes.FLOAT,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return Product;
};