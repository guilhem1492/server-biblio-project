const router = require("express").Router();
const protectRoute = require("../middlewares/protectRoute");
const Ebook = require("../models/Ebook.model");

router.get("/", async (req, res, next) => {
  try {
    const someBooks = await Ebook.find();
    const randomBooks = [];

    for (let index = 0; index < 6; index++) {
      const randomBook = someBooks.splice(
        Math.floor(Math.random() * someBooks.length),
        1
      )[0];
      randomBooks.push(randomBook);
    }
    res.status(200).json(randomBooks);
  } catch (error) {
    next(error);
  }
});

router.use(require("./search"));
router.use(require("./oneBook"));

router.get("/private", protectRoute, (req, res, next) => {
  res.send("Protection passed !");
});

module.exports = router;
