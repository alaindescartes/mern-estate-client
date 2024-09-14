const env = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
env.config();

//connecting to MongoDb
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

app.listen(3000, () => {
  console.log("server is running on port 3000!!");
});
