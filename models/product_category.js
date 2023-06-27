'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Category.hasMany(models.product, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  Product_Category.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_category',
  });
  return Product_Category;
};