const { Category } = require("../../models");

exports.getCategories = async () => {
  const data = await Category.findAll({ attributes: ["id", "name", "slug"] });
  return data;
};

exports.getCategoryById = async (id) => {
  const data = await Category.findOne({
    where: { id },
    attributes: ["id", "name", "slug"],
  });
  return data;
};

exports.getCategoryBySlug = async (slug) => {
  const data = await Category.findOne({
    where: { slug },
    attributes: ["id", "name", "slug"],
  });
  return data;
};

exports.createCategory = async (payload) => {
  const category = await Category.create(payload);

  return await Category.findOne({
    where: { id: category.id },
    attributes: ["id", "name", "slug"],
  });
};

exports.updateCategory = async (id, payload) => {
  const category = await Category.update(payload, {
    where: { id },
  });
  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.destroy({
    where: { id },
  });
  return category;
};
