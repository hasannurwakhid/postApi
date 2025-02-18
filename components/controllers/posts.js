const {
  createPost,
  getPosts,
  deletePostById,
  updatePostById,
  getPostById,
} = require("../services/posts");

exports.createPost = async (req, res, next) => {
  try {
    const user_id = req?.user?.id;

    const {
      title,
      content,
      category_id,
      status,
      meta_title,
      meta_description,
    } = req?.body;

    let tags = req?.body?.tags;

    if (typeof tags === "string") {
      tags = tags.split(",").map((tag) => tag.trim()); // Memisahkan berdasarkan koma dan menghapus spasi
    }

    const ip = req.headers["x-forwarded-for"] || req.ip;
    const userAgent = req.headers["user-agent"];

    const thumbnail = req?.files?.thumbnail;

    const post = {
      title,
      content,
      category_id,
      user_id,
      status,
      meta_title,
      meta_description,
      thumbnail,
    };

    const postActivity = { ip, userAgent };

    const data = await createPost(post, tags);

    res.status(200).json({
      message: "Post berhasil disimpan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const data = await getPosts();

    res.status(200).json({
      message: "Posts berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const id = req?.params?.id;

    const ip = req.headers["x-forwarded-for"] || req.ip;
    const userAgent = req.headers["user-agent"];
    const postActivity = { ip, userAgent };

    const data = await getPostById(id, postActivity);

    res.status(200).json({
      message: "Post berhasil didapatkan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePostById = async (req, res, next) => {
  try {
    const id = req?.params?.id;
    const user_id = req?.user?.id;

    const {
      title,
      content,
      category_id,
      status,
      meta_title,
      meta_description,
    } = req?.body;

    const ip = req.headers["x-forwarded-for"] || req.ip;
    const userAgent = req.headers["user-agent"];

    const thumbnail = req?.files?.thumbnail;

    const post = {
      title,
      content,
      category_id,
      user_id,
      status,
      meta_title,
      meta_description,
      thumbnail,
    };

    const postActivity = { ip, userAgent };

    const data = await updatePostById(id, post);

    res.status(200).json({
      message: "Post berhasil disimpan",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    const id = req?.params?.id;

    const data = await deletePostById(id);
    res.status(200).json({
      message: "Post berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};
