const {
  createPost,
  getPosts,
  deletePostById,
  updatePostById,
  getPostById,
  getPostByUserId,
} = require("../services/posts");

const Joi = require("joi");

exports.createPost = async (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).required().empty().messages({
        "string.min": "Title minimal 3 karakter!",
        "string.empty": "Title harus diisi!",
        "any.required": "Title diperlukan!",
      }),
      content: Joi.string().min(3).required().empty().messages({
        "string.min": "Content minimal 3 karakter!",
        "string.empty": "Content harus diisi!",
        "any.required": "Content diperlukan!",
      }),
      category_id: Joi.number().integer().required().messages({
        "number.base": "Category ID harus berupa angka!",
        "any.required": "Category ID diperlukan!",
      }),
      status: Joi.string().valid("publish", "draft").required().messages({
        "any.only": "Status hanya boleh 'publish' atau 'draft'!",
        "any.required": "Status diperlukan!",
      }),
      meta_title: Joi.string().allow(null, "").max(255),
      meta_description: Joi.string().allow(null, "").max(500),
      tags: Joi.alternatives(
        Joi.string(), // Bisa berupa string "1,2,3"
        Joi.array().items(Joi.string()) // Bisa array ["tag1", "tag2"]
      )
        .allow(null, "")
        .messages({
          "alternatives.types": "Tags harus berupa array atau string!",
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return next({
        message: error.details[0].message,
        statusCode: 400,
      });
    }

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

    const categoryId = isNaN(category_id) ? null : parseInt(category_id);

    if (typeof tags === "string") {
      tags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    } else if (!Array.isArray(tags)) {
      tags = [];
    }

    const thumbnail = req?.files?.thumbnail || null;

    const post = {
      title,
      content,
      category_id: categoryId,
      user_id,
      status,
      meta_title,
      meta_description,
      thumbnail,
    };

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

    if (!id || isNaN(id)) {
      return next({
        message: "ID kategori tidak valid!",
        statusCode: 400,
      });
    }

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

exports.getPostByUserId = async (req, res, next) => {
  try {
    const user_id = req?.user?.id;

    const data = await getPostByUserId(user_id);

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

    if (!id || isNaN(id)) {
      return next({
        message: "ID kategori tidak valid!",
        statusCode: 400,
      });
    }

    const user_id = req?.user?.id;

    const schema = Joi.object({
      title: Joi.string().min(3).required().empty().messages({
        "string.min": "Title minimal 3 karakter!",
        "string.empty": "Title harus diisi!",
        "any.required": "Title diperlukan!",
      }),
      content: Joi.string().min(3).required().empty().messages({
        "string.min": "Content minimal 3 karakter!",
        "string.empty": "Content harus diisi!",
        "any.required": "Content diperlukan!",
      }),
      category_id: Joi.number().integer().required().messages({
        "number.base": "Category ID harus berupa angka!",
        "any.required": "Category ID diperlukan!",
      }),
      status: Joi.string().valid("publish", "draft").required().messages({
        "any.only": "Status hanya boleh 'publish' atau 'draft'!",
        "any.required": "Status diperlukan!",
      }),
      meta_title: Joi.string().allow(null, "").max(255),
      meta_description: Joi.string().allow(null, "").max(500),
      tags: Joi.alternatives(
        Joi.string(), // Bisa berupa string "1,2,3"
        Joi.array().items(Joi.string()) // Bisa array ["tag1", "tag2"]
      )
        .allow(null, "")
        .messages({
          "alternatives.types": "Tags harus berupa array atau string!",
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return next({
        message: error.details[0].message,
        statusCode: 400,
      });
    }

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

    if (!id || isNaN(id)) {
      return next({
        message: "ID kategori tidak valid!",
        statusCode: 400,
      });
    }

    const data = await deletePostById(id);
    res.status(200).json({
      message: "Post berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
};
