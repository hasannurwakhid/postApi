const {
  createPostTag,
  getPostTags,
  getPostById,
  updatePostTag,
  deletePostTag,
} = require("../services/postTags");

exports.createPostTag = async (req, res, next) => {
  try {
    const { post_id, tag_id } = req?.body;

    const data = await createPostTag({ post_id, tag_id });

    res.status(200).json({
      message: "Post Tag berhasil disimpan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostTags = async (req, res, next) => {
  try {
    const data = await getPostTags();

    res.status(200).json({
      message: "Post Tags berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const id = req?.params?.id;

    const data = await getPostById(id);

    res.status(200).json({
      message: "Post Tag berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePostTag = async (req, res, next) => {
  try {
    const id = req?.params?.id;

    const { post_id, tag_id } = req?.body;

    const data = await updatePostTag(id, { post_id, tag_id });

    res.status(200).json({
      message: "Post Tag berhasil diupdate",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePostTag = async (req, res, next) => {
  try {
    const id = req?.params?.id;

    const data = await deletePostTag(id);

    res.status(200).json({
      message: "Post Tag berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};
