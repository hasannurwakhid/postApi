const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  getUserByID,
  getUserByUsername,
  createUser,
} = require("../repositories/auth");

exports.register = async (payload) => {
  const existingUser = await getUserByUsername(payload.username);

  if (existingUser) {
    const error = new Error("Username sudah terdaftar");
    error.statusCode = 409;
    throw error;
  }

  await createUser(payload);

  return null;
};

exports.login = async (payload) => {
  let user = await getUserByUsername(payload.username);
  if (!user) {
    const error = new Error(`Username belum terdaftar`);
    error.statusCode = 401;
    throw error;
  }

  const isValid = await bcrypt.compare(payload.password, user?.password);
  if (!isValid) {
    const error = new Error(`Username atau Password salah`);
    error.statusCode = 401;
    throw error;
  }

  if (user?.dataValues?.password) {
    delete user?.dataValues?.password;
  } else {
    delete user?.password;
  }

  const jwtPayload = {
    id: user.id,
  };

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });

  const data = {
    user,
    token,
  };

  return data;
};

exports.profile = async (id) => {
  // get the user
  let data = await getUserByID(id);
  if (!data) {
    throw new Error(`User is not found!`);
  }

  // delete password
  if (data?.dataValues?.password) {
    delete data?.dataValues?.password;
  } else {
    delete data?.password;
  }

  return data;
};
