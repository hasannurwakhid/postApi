const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middleware/auth");

const {
  createPost,
  updatePostById,
  getPostById,
  getPosts,
  deletePostById,
} = require("../controllers/posts");

router
  .route("/")
  .post(authMiddleware, createPost)
  .get(authMiddleware, getPosts);

router
  .route("/:id")
  .put(authMiddleware, updatePostById)
  .get(authMiddleware, getPostById)
  .delete(authMiddleware, deletePostById);

module.exports = router;
