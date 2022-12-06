const router = require("express").Router();
const getCurrentUser = require("../middlewares/getCurrentUser");
const isAuthenticated = require("../middlewares/jwt.middleware");
const Ebook = require("../models/Ebook.model");
const FavEbook = require("../models/FavEbook.model");
const User = require("../models/User.model");

router.get("/books/:id", getCurrentUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const myBook = await Ebook.findById(id);
    let favBook = false;

    if (req.currentUser) {
      favBook = Boolean(
        await FavEbook.findOne({
          ebook: myBook.id,
          user: req.currentUser.id,
        })
      );
    }

    myBook._doc.isFaved = favBook;

    res.status(200).json(myBook);
  } catch (error) {
    next(error);
  }
});

/* .post
1º the ID of the book 
2º the ID of the user
3º change the user model and create an array of favorite books
4º put the ID of the book inside that array


*/

module.exports = router;
