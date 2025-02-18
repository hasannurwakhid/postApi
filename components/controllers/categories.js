const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} = require("../services/categories");

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req?.body;

    if (name == "" || !name) {
      return next({
        message: "Name harus diisi!",
        statusCode: 400,
      });
    }

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
    const { name } = req?.body;
    const { id } = req?.params;

    if (name == "" || !name) {
      return next({
        message: "Name harus diisi!",
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
