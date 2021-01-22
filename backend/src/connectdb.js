const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected successfully...");
  })
  .catch(() => {
    console.log("you have error in connecting to database");
  });
