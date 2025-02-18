"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post_Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post_Activity.belongsTo(models.Post, { foreignKey: "post_id" });
    }
  }
  Post_Activity.init(
    {
      post_id: DataTypes.INTEGER,
      ip: DataTypes.STRING,
      userAgent: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post_Activity",
      paranoid: true,
    }
  );
  return Post_Activity;
};
