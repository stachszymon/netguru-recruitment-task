const { authFactory, AuthError } = require("../utils/auth"),
  { JWT_SECRET } = process.env,
  { valid } = authFactory(JWT_SECRET);

module.exports = {
  userVerifi: (req, res, next) => {
    const { authorization } = req.headers;

    if (req.state === undefined) {
      req.state = {};
    }

    if (authorization !== undefined) {
      const userData = valid(authorization.split(" ")[1]);

      req.state.user = userData !== false ? userData : undefined;
    }

    next();
  },
  userRequired: (req, res, next) => {
    if (req.state.user == null) {
      res.status(403).json({ error: "unauthorized" });
    } else {
      next();
    }
  },
};
