const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  rname: {
    type: String,
  },
  messages: [
    {
      message: {
        type: String,
      },
      username: {
        type: String,
      },

      userimg: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
