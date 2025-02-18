const { Tag } = require("../../models");

exports.getTags = async () => {
  return await Tag.findAll({ attributes: ["id", "name", "slug"] });
};

exports.getTagById = async (id) => {
  const data = await Tag.findOne({
    where: { id },
    attributes: ["id", "name", "slug"],
  });
  return data;
};

exports.getTagBySlug = async (slug) => {
  const data = await Tag.findOne({
    where: { slug },
    attributes: ["id", "name", "slug"],
  });
  return data;
};

exports.createTag = async (payload) => {
  const tag = await Tag.create(payload);
  return await Tag.findOne({
    where: { id: tag.id },
    attributes: ["id", "name", "slug"],
  });
};

exports.updateTag = async (id, payload) => {
  return await Tag.update(payload, { where: { id } });
};

exports.deleteTag = async (id) => {
  return await Tag.destroy({ where: { id } });
};
