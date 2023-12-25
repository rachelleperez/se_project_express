const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middlewares/auth");

const { PORT = 3001 } = process.env;
const { login, createUser } = require("./controllers/users");
const { getClothingItems } = require("./controllers/clothingItems");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error("DB Error", e));

const routes = require("./routes");
app.use(cors());
app.use(express.json());

// import routes that don't need auth middleware
app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getClothingItems);

// add authorization for remaining routes
app.use(auth);
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log(
    "******************************************************************************************************************",
  );
});
