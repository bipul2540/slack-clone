const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/testapp", {
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
