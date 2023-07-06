'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Features extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Features.belongsTo(models.product, {
        foreignKey: 'productId',
      });
      Product_Features.belongsTo(models.feature_attribute, {
        foreignKey: 'featureId'
      });
    }
  }
  Product_Features.init({
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_feature',
  });
  return Product_Features;
};