const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const getCurrentUser = (req, res, next) => {
  const header = req.headers["authorization"];
  const bearer = header.split(" ");
  const token = bearer[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, authorizedData) => {
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
    });
  }

  next();
};

module.exports = getCurrentUser;
