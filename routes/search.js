const router = require("express").Router();
const Ebook = require("../models/Ebook.model");

router.get("/search", async (req, res, next) => {
  try {
    const { books } = req.query;

    const searchQ = new RegExp(books, "gi");

    let searchedBook = [];

    searchedBook = await Ebook.find({ title: searchQ });
    res.json(searchedBook);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
