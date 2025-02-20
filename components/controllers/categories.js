const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} = require("../services/categories");

const Joi = require("joi");

exports.createCategory = async (req, res, next) => {
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

    const data = await createCategory({
      name,
    });

    res.status(200).json({
      message: "Category berhasil disimpan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const data = await getCategories();

    res.status(200).json({
      message: "Categories berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req?.params;

    if (!id || isNaN(id)) {
      return next({
        message: "ID kategori tidak valid!",
        statusCode: 400,
      });
    }

    const data = await deleteCategoryById(id);

    res.status(200).json({
      message: "Category berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
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
        message: "ID kategori tidak valid!",
        statusCode: 400,
      });
    }

    const data = await updateCategory(id, {
      name,
    });

    res.status(200).json({
      message: "Category berhasil diupdate",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req?.params;

    const data = await getCategoryById(id);

    res.status(200).json({
      message: "Category berhasil didapat",
      data,
    });
  } catch (error) {
    next(error);
  }
};
