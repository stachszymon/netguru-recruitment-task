const { omdb: omdbapikey } = require("../config/apikeys"),
  axios = require("axios");

module.exports = {
  getMovieByTitle: (title) =>
    axios.get(`http://www.omdbapi.com/?apikey=${omdbapikey}&t=${title}`),
};
