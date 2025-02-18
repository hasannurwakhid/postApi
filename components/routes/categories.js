const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middleware/auth");
const {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("../controllers/categories");

router
  .route("/")
  .post(authMiddleware, createCategory)
  .get(authMiddleware, getCategories);

router
  .route("/:id")
  .get(authMiddleware, getCategoryById)
  .delete(authMiddleware, deleteCategory)
  .put(authMiddleware, updateCategory);

module.exports = router;
