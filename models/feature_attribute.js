'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature_Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feature_Attribute.hasMany(models.product_feature, {
        foreignKey: 'featureId'
      })
      Feature_Attribute.belongsToMany(models.product, {
        through: models.product_feature,
        foreignKey: 'featureId'
      })
    }
  }
  Feature_Attribute.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feature_attribute',
  });
  return Feature_Attribute;
};