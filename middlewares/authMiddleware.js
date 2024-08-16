const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }
    const token = authHeader.split(" ")[1];

    // Verify token
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user",
        });
      } else {
        req.body.id = decode.id; // Modify req.body, not res.body
        next();
      }
    });
  } catch (error) {
    console.log("Error in authMiddleware:", error);
    res.status(500).send({
      success: false,
      message: "Please provide auth token",
      error,
    });
  }
};
