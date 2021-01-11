const express = require("express"),
  router = express.Router(),
  { JWT_SECRET } = process.env,
  { authFactory, AuthError } = require("../utils/auth"),
  { auth } = authFactory(JWT_SECRET);

router.post("/auth", (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ error: "invalid payload" });
  }

  const { username, password } = req.body;

  try {
    const token = auth(username, password);

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    next(error);
  }
});

module.exports = router;
