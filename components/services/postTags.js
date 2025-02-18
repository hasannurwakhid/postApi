const {
  createPostTag,
  getPostTags,
  getPostTagById,
  updatePostTag,
  deletePostTag,
} = require("../repositories/postTags");

exports.createPostTag = async (payload) => {
  return await createPostTag(payload);
};

exports.getPostTags = async () => {
  return await getPostTags();
};

exports.getPostById = async (id) => {
  return await getPostTagById(id);
};

exports.updatePostTag = async (id, payload) => {
  const existingPostTag = await getPostTagById(id);
  if (!existingPostTag) {
    const error = new Error("PostTag tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return await updatePostTag(id, payload);
};

exports.deletePostTag = async (id) => {
  const existingPostTag = await getPostTagById(id);
  if (!existingPostTag) {
    const error = new Error("PostTag tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return await deletePostTag(id);
};
