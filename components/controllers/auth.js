const { register, login } = require("../services/auth");

exports.register = async (req, res, next) => {
  try {
    const { username, password, name } = req?.body;

    if (username == "" || !username) {
      return next({
        message: "Username harus diisi!",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password harus diisi!",
        statusCode: 400,
      });
    }
    if (name == "" || !name) {
      return next({
        message: "Name harus diisi!",
        statusCode: 400,
      });
    }

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
    const { username, password } = req?.body;

    if (username == "" || !username) {
      return next({
        message: "Username harus diisi!",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password harus diisi!",
        statusCode: 400,
      });
    }

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
