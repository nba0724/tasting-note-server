"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TastingSheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models["tasting-sheet"].hasMany(models["tasting-value"], {
        foreignKey: "uid",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  TastingSheet.init(
    {
      tasting_id: { type: DataTypes.INTEGER, primaryKey: true },
      uid: DataTypes.STRING,
      is_red_wine: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "tasting-sheet",
      underscored: true,
    }
  );
  return TastingSheet;
};
