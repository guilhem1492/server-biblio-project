const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const protectRoute = require("../middlewares/protectRoute");
const Ebook = require("../models/Ebook.model");
const FavEbook = require("../models/FavEbook.model");
const User = require("../models/User.model");
const saltRounds = 10;

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allFavBooks = await FavEbook.find({ user: req.payload.id }).populate(
      "ebook"
    );

    res.status(200).json(allFavBooks);
  } catch (error) {
    next(error);
  }
});

router.post("/:id", protectRoute, isAuthenticated, async (req, res, next) => {
  try {
    const favBook = req.params.id;
    const currentUser = await User.findById(req.payload.id);
    const foundBook = await Ebook.findById(favBook);
    if (!currentUser || !foundBook) {
      res.status(404).json({ message: "Livre introuvable !" });
    }

    await FavEbook.findOneAndUpdate(
      { ebook: favBook, user: currentUser.id },
      { ebook: favBook, user: currentUser.id },
      { upsert: true }
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error.status);
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const favBook = req.params.id;
    const currentUser = await User.findById(req.payload.id);
    const foundBook = await Ebook.findById(favBook);
    if (!currentUser || !foundBook) {
      res.status(404).json({ message: "Livre introuvable !" });
    }

    await FavEbook.findOneAndDelete({ ebook: favBook, user: currentUser.id });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
