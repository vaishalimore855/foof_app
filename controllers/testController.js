const testController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "test User data API",
    });
  } catch (error) {
    console.log("Error in test API", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { testController };
