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
        default:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRldFmaG9uIYcgHKm98x9BRQVo1zjtEnvIGNg&usqp=CAU",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
