const router = require("express").Router();
const isAuthenticated = require("../middlewares/jwt.middleware");
const Ebook = require("../models/Ebook.model");
const FavEbook = require("../models/FavEbook.model");
const User = require("../models/User.model");

router.get("/books/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const myBook = await Ebook.findById(id);
    const currentUser = await User.findById(req.payload.id);
    const favBook = await FavEbook.findOne({
      ebook: myBook.id,
      user: currentUser.id,
    });

    myBook._doc.isFaved = Boolean(favBook);

    console.log("myBook", myBook);
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
