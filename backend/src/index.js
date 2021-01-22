const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 4001;
const homeRouter = require("./routes/home");

const app = express();
app.use(cors());
app.use(homeRouter);

const server = http.createServer(app);
const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client in connected");

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    getApiAndEmit(socket);
  }, 1000);
  socket.on("disconnect", () => {
    console.log("client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("FromAPI", response);
};

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
