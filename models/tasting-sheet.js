'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tastingSheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tastingSheet.hasMany(models.tastingValue, {
        foreignKey: "uid",
        onDelete: "cascade",
        hooks: true
      });
    }
  };
  tastingSheet.init({
    tasting_id: DataTypes.INTEGER,
    uid: DataTypes.STRING,
    is_red_wine: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tasting-sheet',
    underscored: true,
  });
  return tastingSheet;
};