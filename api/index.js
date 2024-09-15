const env = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const authRoute = require("./routes/authRoute");
env.config();

app.use(express.json());

//connecting to MongoDb
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

//middleware routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);

app.listen(3000, () => {
  console.log("server is running on port 3000!!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
