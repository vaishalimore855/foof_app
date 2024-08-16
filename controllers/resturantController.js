const restaurantModel = require("../models/restaurantModel");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imgUrl,
      time,
      foods,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and coords",
      });
    }
    const newResturant = new restaurantModel({
      title,
      imgUrl,
      time,
      foods,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newResturant.save();
    res.status(200).send({
      success: true,
      message: "New Resturant created Successfully!",
      restaurant: newResturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create resturant API",
      error,
    });
  }
};

// GET All Resturant
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await restaurantModel.find({});
    if (!resturants) {
      res.status(404).send({
        success: false,
        message: "No Resturant Available!",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Resturant API",
      error,
    });
  }
};

// GET RESTURANT BY ID || GET
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;

    //validation
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturant Id",
      });
    }
    // find resturant
    const resturant = await restaurantModel.findById(resturantID);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "No resturant Found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get resturant by id API",
      error,
    });
  }
};

//DELETE RESTURANT
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    //validation
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturant Id or No Resturant found",
      });
    }
    await restaurantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Resturant API",
      error,
    });
  }
};
module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
