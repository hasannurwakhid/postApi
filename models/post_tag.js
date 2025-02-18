"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post_Tag.belongsTo(models.Tag, { foreignKey: "tag_id" });
      Post_Tag.belongsTo(models.Post, { foreignKey: "post_id" });
    }
  }
  Post_Tag.init(
    {
      post_id: DataTypes.INTEGER,
      tag_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post_Tag",
      paranoid: true,
    }
  );
  return Post_Tag;
};
