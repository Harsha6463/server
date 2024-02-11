const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const port = 1999;
const bodyParser = require("body-parser");
const userController = require("./src/controllers/user-controllers");
const { authentication } = require("./middleware");
app.use("/", bodyParser.json());
const AuthController = require("./src/controllers/authcontroller");

const start = async function () {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URL
    );
    console.log("Successfully connected to MDB");
    routing();

    app.listen(port, () => {
      console.log("server is running at http://localhost:" + port);
    });
  } catch (error) {
    console.log("Unable To Connect MDB");
  }
};

const routing = function () {
  app.use("/userData", authentication, userController.router);
  app.use("/auth", AuthController.router);
};

start();
