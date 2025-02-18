"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Post_Activity, { foreignKey: "post_id" });
      Post.hasMany(models.Post_Tag, { foreignKey: "post_id" });
      Post.belongsTo(models.User, { foreignKey: "user_id" });
      Post.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      content: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
      published_at: DataTypes.DATE,
      meta_title: DataTypes.STRING,
      meta_description: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
      paranoid: true,
    }
  );
  return Post;
};
