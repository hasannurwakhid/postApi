const { Post, Post_Tag, Tag, User } = require("../../models");

exports.createPost = async (payload) => {
  const data = await Post.create(payload);
  return await Post.findOne({
    where: { id: data.id },
    attributes: [
      "id",
      "title",
      "slug",
      "content",
      "user_id",
      "thumbnail",
      "published_at",
      "status",
    ],
  });
};

exports.updatePostById = async (id, payload) => {
  await Post.update(payload, { where: { id } });
  const data = await Post.findOne({
    where: { id },
    attributes: [
      "id",
      "title",
      "slug",
      "content",
      "user_id",
      "thumbnail",
      "published_at",
      "status",
    ],
  });
  return data;
};

exports.getPostById = async (id) => {
  const data = await Post.findOne({
    where: { id },
    attributes: [
      "id",
      "title",
      "slug",
      "content",
      "user_id",
      "thumbnail",
      "published_at",
      "status",
    ],
  });
  return data;
};

exports.getPostByUserId = async (user_id) => {
  const data = await Post.findAll({
    where: { user_id },
    attributes: [
      "id",
      "title",
      "slug",
      "content",
      "user_id",
      "thumbnail",
      "published_at",
      "status",
    ],
  });
  return data;
};

exports.getPosts = async () => {
  const data = await Post.findAll({
    attributes: [
      "id",
      "title",
      "slug",
      "content",
      "user_id",
      "thumbnail",
      "published_at",
      "status",
    ],
    include: [
      {
        model: Post_Tag,
        attributes: ["tag_id"],
        include: [
          {
            model: Tag,
            attributes: ["name"],
          },
        ],
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  });
  return data;
};

exports.deletePostById = async (id) => {
  const data = await Post.destroy({ where: { id } });
  return data;
};
