const {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../repositories/categories");
const slugify = require("slugify");

exports.getCategories = async () => {
  return await getCategories();
};

exports.getCategoryById = async (id) => {
  const existingCategory = await getCategoryById(id);
  if (!existingCategory) {
    const error = new Error("Category tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return await existingCategory;
};

exports.createCategory = async (payload) => {
  let slug = slugify(payload.name, { lower: true, strict: true });

  let existingCategory = await getCategoryBySlug(slug);
  if (existingCategory) {
    const error = new Error("Category dan Slug sudah terdaftar");
    error.statusCode = 409;
    throw error;
  }
  payload.slug = slug;
  return await createCategory(payload);
};

exports.updateCategory = async (id, payload) => {
  const existingCategory = await getCategoryById(id);

  if (!existingCategory) {
    const error = new Error("Category tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  let slug = slugify(payload.name, { lower: true, strict: true });
  payload.slug = slug;
  return await updateCategory(id, payload);
};

exports.deleteCategoryById = async (id) => {
  const existingCategory = await getCategoryById(id);
  if (!existingCategory) {
    const error = new Error("Category tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return await deleteCategory(id);
};
