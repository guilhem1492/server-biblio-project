const router = require("express").Router();
const Ebook = require("../models/Ebook.model");

router.get("/search", async (req, res, next) => {
  try {
    const { title, author } = req.query;

    if (!title && !author) return res.json([]); // to force users to provide input

    const searchQ = title
      ? { title: new RegExp(title, "gi") }
      : { "author.name": new RegExp(author, "gi") };

    const searchedBook = await Ebook.find(searchQ);
    res.status(200).json(searchedBook);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
