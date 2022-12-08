const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const getCurrentUser = (req, res, next) => {
  try {
    const header = req.headers["authorization"];

    const token = header?.split(" ")[1];

    if (token) {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        async (err, authorizedData) => {
          if (err) {
            //If error send Unauthorised (401)
            console.log("ERROR: Could not connect to the protected route");
            return res.sendStatus(401);
          } else {
            //If token is successfully verified, we can enter in the next route
            const currentUser = await User.findById(authorizedData.id, {
              password: 0,
            });
            req.currentUser = currentUser;
          }
        }
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrentUser;
