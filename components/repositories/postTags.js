const { Post_Tag } = require("../../models");

exports.getPostTags = async () => {
  return await Post_Tag.findAll({ attributes: ["id", "post_id", "tag_id"] });
};

exports.getPostTagById = async (id) => {
  return await Post_Tag.findOne({
    where: { id },
    attributes: ["id", "post_id", "tag_id"],
  });
};

exports.createPostTag = async (payload) => {
  const createdPostTag = await Post_Tag.create(payload);
  const data = Post_Tag.findOne({
    where: { id: createdPostTag.id },
    attributes: ["id", "post_id", "tag_id"],
  });
  return data;
};

exports.updatePostTag = async (id, payload) => {
  await Post_Tag.update(payload, { where: { id } });
  const data = Post_Tag.findOne({
    where: { id },
    attributes: ["id", "post_id", "tag_id"],
  });
  return data;
};

exports.deletePostTag = async (id) => {
  return await Post_Tag.destroy({ where: { id } });
};
