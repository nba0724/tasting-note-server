'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tastingValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tastingValue.belongsTo(models.tastingSheet, {
        foreignKey: "tasting_id",
        targetKey: "tasting_id"
      });
    }
  };
  tastingValue.init({
    tasting_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tasting-value',
    underscored: true,
  });
  return tastingValue;
};