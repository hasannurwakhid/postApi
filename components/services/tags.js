const {
  getTags,
  getTagById,
  getTagBySlug,
  createTag,
  deleteTag,
  updateTag,
} = require("../repositories/tags");
const slugify = require("slugify");
exports.getTags = async () => {
  return await getTags();
};

exports.getTagById = async (id) => {
  const exixtingTag = await getTagById(id);
  if (!exixtingTag) {
    const error = new Error("Tag tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return await exixtingTag;
};

exports.createTag = async (payload) => {
  let slug = slugify(payload.name, { lower: true, strict: true });
  let exixtingTag = await getTagBySlug(slug);
  if (exixtingTag) {
    const error = new Error("Tag dan Slug sudah terdaftar");
    error.statusCode = 409;
    throw error;
  }
  payload.slug = slug;
  return await createTag(payload);
};

exports.updateTag = async (id, payload) => {
  const exixtingTag = await getTagById(id);
  if (!exixtingTag) {
    const error = new Error("Tag tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  let slug = slugify(payload.name, { lower: true, strict: true });
  payload.slug = slug;
  return await updateTag(id, payload);
};

exports.deleteTag = async (id) => {
  const exixtingTag = await getTagById(id);
  if (!exixtingTag) {
    const error = new Error("Tag tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return await deleteTag(id);
};
