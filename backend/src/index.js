const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("./connectdb");
const Pusher = require("pusher");

const roomRoute = require("./routes/room");

const app = express();
const port = process.env.PORT || 5000;

// pusher

const pusher = new Pusher({
  appId: "1143183",
  key: "3e9e59fcb70fcd44553b",
  secret: "55ad77eb6f7b4ceb2e08",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;

db.once("open", async () => {
  try {
    const roomsCollection = await db.collection("rooms");
    const changeStream = await roomsCollection.watch();
    changeStream.on("change", (change) => {
      console.log("change occured");

      if (change.operationType === "insert") {
        const allRoomData = change.fullDocument;
        console.log(allRoomData);

        pusher.trigger("rooms", "inserted", {
          _id: allRoomData._id,
          rname: allRoomData.rname,
        });

        pusher.trigger("messages", "inserted", {
          messages: [
            {
              message: allRoomData.message
            }
          ],
        });
      } else {
        console.log("Error triggering pusher");
      }
    });
  } catch (error) {
    console.log("you have error in inserting data");
  }
});

app.use(express.json());
app.use(cors());

app.use("/api", roomRoute);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
