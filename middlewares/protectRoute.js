const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  const header = req.headers["authorization"];
  const bearer = header.split(" ");
  const token = bearer[1];

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, authorizedData) => {
      if (err) {
        //If error send Unauthorised (401)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(401);
      } else {
        //If token is successfully verified, we can enter in the next route

        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = protectRoute;
