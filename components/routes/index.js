const express = require("express");
const router = express.Router();

const auth = require("./auth");
const categories = require("./categories");
const tags = require("./tags");
const posts = require("./posts");
const postTags = require("./postTags");

router.use("/auth", auth);
router.use("/categories", categories);
router.use("/tags", tags);
router.use("/posts", posts);
router.use("/postTags", postTags);

module.exports = router;
