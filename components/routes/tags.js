const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middleware/auth");
const {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} = require("../controllers/tags");

router.route("/").post(authMiddleware, createTag).get(authMiddleware, getTags);

router
  .route("/:id")
  .get(authMiddleware, getTagById)
  .put(authMiddleware, updateTag)
  .delete(authMiddleware, deleteTag);

module.exports = router;
