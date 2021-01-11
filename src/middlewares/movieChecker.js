const Movie = require("../model/movie");

const MAX_COUNT_IN_MONTH = 5;

module.exports = async (req, res, next) => {
  try {
    const { user } = req.state;

    if (user.role !== "premium") {
      const firstDate = Date.today()
          .clearTime()
          .moveToFirstDayOfMonth()
          .toISOString(),
        lastDate = Date.today()
          .clearTime()
          .moveToLastDayOfMonth()
          .toISOString();

      const count = await Movie.countDocuments({
        CreatedBy: user.userId,
        createdAt: {
          $gte: firstDate,
          $lte: lastDate,
        },
      });

      if (count >= MAX_COUNT_IN_MONTH) {
        return res
          .status(429)
          .json({ error: "To many movies added in this month" });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};
