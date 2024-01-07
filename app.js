require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;
const { login, createUser } = require("./controllers/users");
const { getClothingItems } = require("./controllers/clothingItems");

const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validation");
const errorHandler = require("./middlewares/error-handler");

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
app.use(requestLogger); // add logger before all route handlers

// prepare for crashes, remove after the review
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// import routes that don't need auth middleware
app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);
app.get("/items", getClothingItems);

// add authorization for remaining routes
app.use(auth);
app.use(routes);

// enabling the error logger, after routers, before error handlers
app.use(errorLogger);

// celebrate (validation) error handler
app.use(errors());

// centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log(
    "******************************************************************************************************************",
  );
});
