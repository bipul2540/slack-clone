const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).send({ response: "i am alive" });
});

module.exports = router;
