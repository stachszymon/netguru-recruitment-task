const mongoose = require("mongoose"),
  { Schema } = mongoose;

const movieSchema = new Schema(
  {
    Title: String,
    Released: Date,
    Genre: String,
    Directory: String,
    CreatedBy: Number,
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
