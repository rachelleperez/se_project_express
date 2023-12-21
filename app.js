const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error("DB Error", e));

const routes = require("./routes");
app.use(express.json());

// Temp authorization middleware, hard-coded owner
app.use((req, res, next) => {
  req.user = {
    _id: "6584be40692fff3dc2896eee", // paste the _id of the test user created in the previous step
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
