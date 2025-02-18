const bcrypt = require("bcrypt");
const { User } = require("../../models");

exports.getUserByID = async (id) => {
  const data = await User.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    return data[0];
  }
  throw new Error(`User is not found!`);
};

exports.getUserByUsername = async (username) => {
  const data = await User.findOne({
    where: { username },
    attributes: ["id", "username", "name", "password"],
  });
  return data;
};

exports.createUser = async (payload) => {
  payload.password = bcrypt.hashSync(payload.password, 10);

  return (data = await User.create(payload));
};
