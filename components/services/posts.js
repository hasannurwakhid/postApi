const { uploader } = require("../../helper/cloudinary");
const crypto = require("crypto");
const path = require("path");
const slugify = require("slugify");

const {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
} = require("../repositories/Posts");

const { createPostTag } = require("../repositories/postTags");

const { createPostActivity } = require("../repositories/postActivities");

exports.createPost = async (payload, tags) => {
  const image = payload.thumbnail;

  let slug = slugify(payload.title, { lower: true, strict: true });
  payload.slug = slug;
  payload.published_at = new Date();

  if (image) {
    image.publicId = crypto.randomBytes(16).toString("hex");

    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    const imageUpload = await uploader(image);
    payload.thumbnail = imageUpload.secure_url;
  }

  const createdPost = await createPost(payload);

  if (tags) {
    for (let i = 0; i < tags.length; i++) {
      await createPostTag({ post_id: createdPost.id, tag_id: tags[i] });
    }
  }
  // await createPostActivity(
  //   createdPost.id,
  //   postActivity.ip,
  //   postActivity.userAgent
  // );
  return { data: createdPost };
};

exports.getPosts = async () => {
  const data = await getPosts();
  return data;
};

exports.updatePostById = async (id, payload) => {
  const exixtingPost = await getPostById(id);
  if (!exixtingPost) {
    const error = new Error("Post tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  const image = payload.thumbnail;

  let slug = slugify(payload.title, { lower: true, strict: true });
  payload.slug = slug;
  payload.published_at = new Date();

  if (image && typeof image == "object") {
    image.publicId = crypto.randomBytes(16).toString("hex");

    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    const imageUpload = await uploader(image);
    payload.thumbnail = imageUpload.secure_url;
  }

  const updatedPost = await updatePostById(id, payload);
  // await createPostActivity(
  //   updatedPost.id,
  //   postActivity.ip,
  //   postActivity.userAgent
  // );
  return { updatedPost };
};

exports.getPostById = async (id, postActivity) => {
  const data = await getPostById(id);
  if (!data) {
    const error = new Error("Post tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  await createPostActivity(id, postActivity.ip, postActivity.userAgent);
  return data;
};

exports.deletePostById = async (id) => {
  const data = await getPostById(id);
  if (!data) {
    const error = new Error("Post tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return await deletePostById(id);
};
