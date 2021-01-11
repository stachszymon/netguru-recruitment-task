require("datejs");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { user, password, dbname } = require("./config/db");
const routes = require("./routes/");

const PORT = 3000;
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const app = express();

mongoose.connect(
  `mongodb+srv://${user}:${password}@cluster0.umor1.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(bodyParser.json());

app.use(routes);

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
