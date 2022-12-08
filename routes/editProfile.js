const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const protectRoute = require("../middlewares/protectRoute");
const Ebook = require("../models/Ebook.model");
const FavEbook = require("../models/FavEbook.model");
const User = require("../models/User.model");
const salt = 10;

router.patch("/", isAuthenticated, async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    if (password === "" || newPassword === "") {
      return res
        .status(400)
        .json({ message: "Plus d'informations sont requises !" });
    }
    const currentUser = await User.findById(req.payload.id);
    let hashedPassword;
    if (newPassword) {
      if (password === newPassword) {
        return res
          .status(400)
          .json({ message: "Choisissez un mot de passe différent !" });
      }
      const samePassword = await bcrypt.compare(password, currentUser.password);
      if (!samePassword) {
        return res.status(400).json({ message: "Mot de passe incorrect !" });
      }

      const generatedSalt = await bcrypt.genSalt(salt);
      hashedPassword = await bcrypt.hash(newPassword, generatedSalt);
    }

    await User.findByIdAndUpdate(
      currentUser.id,
      { password: hashedPassword },
      {
        new: true,
      }
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
