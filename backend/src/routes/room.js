const router = require("express").Router();
const Room = require("./../model/Room");

router.post("/room", async (req, res) => {
  try {
    const data = req.body;
    const room = await new Room(data);
    await room.save();
    res.status(200).send(room);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/rooms/get", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get by room id

router.get("/room/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const room = await Room.findById(_id);
    res.status(200).send(room);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get only messges by room id

router.get("/room/messages/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const messages = await Room.findById(_id)
      .select({ messages: 1 })
      .sort({ datefield: -1 });

    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
