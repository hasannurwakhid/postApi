const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { profile } = require("../components/services/auth");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req?.headers);

    const extractedToken = extractToken(token);

    const user = await profile(extractedToken?.id);

    req.user = user;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
