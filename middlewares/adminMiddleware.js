const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user || user.usertype !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Only Admin Access",
      });
    }
    next();
  } catch (error) {
    console.log("Error in adminMiddleware:", error);
    res.status(500).send({
      success: false,
      message: "Un-Authorized Access",
      error,
    });
  }
};
