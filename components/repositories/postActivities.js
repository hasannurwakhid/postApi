const { Post_Activity } = require("../../models");

exports.createPostActivity = async (post_id, ip, userAgent) => {
  await Post_Activity.create({ post_id, ip, userAgent });
  return null;
};
