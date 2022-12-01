const router = require("express").Router();
const Ebook = require("../models/Ebook.model");

router.get("/books/:id", async (req, res, next) => {
  try {
    const myBook = await Ebook.findById(req.params.id);
    console.log("myBook", myBook);
    res.status(200).json(myBook);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
