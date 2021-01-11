const express = require("express"),
  { getMovieByTitle } = require("../services/omdb"),
  movieChecker = require("../middlewares/movieChecker"),
  router = express.Router();

const Movie = require("../model/movie");

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.state.user,
      movies = await Movie.find(
        { CreatedBy: userId },
        "Title Released Genre Directory"
      );

    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
});

router.post("/", movieChecker, async (req, res, next) => {
  const { title } = req.body;

  if (title === undefined && typeof title !== "string") {
    res.status(400).json({ error: `'title' not found in body` });
  } else {
    try {
      const { data } = await getMovieByTitle(title);

      if (data.Response === "False") {
        return res.status(404).json({ error: "No movie found!" });
      }

      const newMovie = new Movie({
        Title: data.Title,
        Released: new Date(data.Released),
        Genre: data.Genre,
        Directory: data.Director,
        CreatedBy: req.state.user.userId,
      });
      await newMovie.save();

      res.status(201).json(newMovie);
    } catch (err) {
      next(err);
    }
  }
});

module.exports = router;
