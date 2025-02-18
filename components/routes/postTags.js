const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middleware/auth");

const {
  createPostTag,
  getPostTags,
  getPostById,
  updatePostTag,
  deletePostTag,
} = require("../controllers/postTags");

router
  .route("/")
  .post(authMiddleware, createPostTag)
  .get(authMiddleware, getPostTags);

router
  .route("/:id")
  .get(authMiddleware, getPostById)
  .put(authMiddleware, updatePostTag)
  .delete(authMiddleware, deletePostTag);
module.exports = router;
