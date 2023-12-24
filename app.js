const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const { login, createUser } = require("./controllers/user");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error("DB Error", e));

const routes = require("./routes");

app.use(express.json());

app.post("/signin", login); // spec: do not protect with auth
app.post("/signup", createUser); // spec: do not protect with auth

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log(
    "******************************************************************************************************************",
  );
});
