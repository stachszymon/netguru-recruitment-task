const express = require("express"),
  router = express.Router();

const { userVerifi, userRequired } = require("../middlewares/auth");

const authRoutes = require("./auth"),
  movieRoutes = require("./movies");

router.use(authRoutes);
router.use("/movies/", userVerifi, userRequired, movieRoutes);

module.exports = router;
