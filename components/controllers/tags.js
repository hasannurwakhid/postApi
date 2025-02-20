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
    if (!id || isNaN(id)) {
      return next({
        message: "ID Tag tidak valid!",
        statusCode: 400,
      });
    }
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
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required().empty().messages({
        "string.min": "Name minimal 2 karakter!",
        "string.max": "Name maksimal 100 karakter!",
        "string.empty": "Name harus diisi!",
        "any.required": "Name diperlukan!",
      }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return next({
        message: error.details[0].message,
        statusCode: 400,
      });
    }

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
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required().empty().messages({
        "string.min": "Name minimal 2 karakter!",
        "string.max": "Name maksimal 100 karakter!",
        "string.empty": "Name harus diisi!",
        "any.required": "Name diperlukan!",
      }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return next({
        message: error.details[0].message,
        statusCode: 400,
      });
    }

    const { name } = req?.body;
    const { id } = req?.params;

    if (!id || isNaN(id)) {
      return next({
        message: "ID Tag tidak valid!",
        statusCode: 400,
      });
    }

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

    if (!id || isNaN(id)) {
      return next({
        message: "ID kategori tidak valid!",
        statusCode: 400,
      });
    }

    const data = await deleteTag(id);
    res.status(200).json({
      message: "Tag berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};
