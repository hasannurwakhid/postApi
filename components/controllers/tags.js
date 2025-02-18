const {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} = require("../services/tags");

exports.getTags = async (req, res, next) => {
  try {
    const data = await getTags();
    res.status(200).json({
      message: "Tags berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTagById = async (req, res, next) => {
  try {
    const { id } = req?.params;
    const data = await getTagById(id);
    res.status(200).json({
      message: "Tag berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const { name } = req?.body;
    const data = await createTag({ name });
    res.status(200).json({
      message: "Tag berhasil disimpan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTag = async (req, res, next) => {
  try {
    const { name } = req?.body;
    const { id } = req?.params;
    const data = await updateTag(id, { name });
    res.status(200).json({
      message: "Tag berhasil diupdate",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTag = async (req, res, next) => {
  try {
    const { id } = req?.params;
    const data = await deleteTag(id);
    res.status(200).json({
      message: "Tag berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};
