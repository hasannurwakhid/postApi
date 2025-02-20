const { register, login } = require("../services/auth");
const Joi = require("joi");

exports.register = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string()
        .pattern(/^\S+$/)
        .alphanum()
        .min(4)
        .max(50)
        .required()
        .empty()
        .messages({
          "string.pattern.base": "Username tidak boleh mengandung spasi!",
          "string.alphanum": "Username hanya boleh mengandung huruf dan angka!",
          "string.min": "Username minimal 4 karakter!",
          "string.max": "Username maksimal 50 karakter!",
          "string.empty": "Username harus diisi!",
          "any.required": "Username diperlukan!",
        }),
      password: Joi.string().min(6).max(100).required().empty().messages({
        "string.min": "Password minimal 6 karakter!",
        "string.max": "Password maksimal 100 karakter!",
        "string.empty": "Password harus diisi!",
        "any.required": "Password diperlukan!",
      }),
      name: Joi.string().min(2).max(100).required().empty().messages({
        "string.min": "Nama minimal 2 karakter!",
        "string.max": "Nama maksimal 100 karakter!",
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

    const { username, password, name } = req?.body;

    const data = await register({
      username,
      password,
      name,
    });

    res.status(200).json({
      message: "Register Berhasil",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required().empty().messages({
        "string.empty": "Username harus diisi!",
        "any.required": "Username diperlukan!",
      }),
      password: Joi.string().required().empty().messages({
        "string.empty": "Password harus diisi!",
        "any.required": "Password diperlukan!",
      }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return next({
        message: error.details[0].message,
        statusCode: 400,
      });
    }

    const { username, password } = req?.body;

    const data = await login({
      username,
      password,
    });

    res.status(200).json({
      message: "Login Berhasil",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    // get user by id
    const data = req.user;

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
