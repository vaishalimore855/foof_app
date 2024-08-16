const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// Create food controller
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      foodTags,
      description,
      price,
      imageUrl,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !description || !price || !resturant) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const newFood = new foodModel({
      title,
      foodTags,
      description,
      price,
      imageUrl,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New food item created",
      newFood,
    });
  } catch (error) {
    console.log("Error in createFoodController:", error);
    res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

// Get all food controller
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods || foods.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No food items were found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log("Error in getAllFoodController:", error);
    res.status(500).send({
      success: false,
      message: "Error in get all foods API",
      error,
    });
  }
};

// Get single food controller
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log("Error in getSingleFoodController:", error);
    res.status(500).send({
      success: false,
      message: "Error in get single food API",
      error,
    });
  }
};

// Get food by restaurant id
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide restaurant id",
      });
    }
    const foods = await foodModel.find({ resturant: resturantId });
    if (!foods || foods.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No food found for this restaurant",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food items found for the restaurant",
      foods,
    });
  } catch (error) {
    console.log("Error in getFoodByResturantController:", error);
    res.status(500).send({
      success: false,
      message: "Error in get food by restaurant API",
      error,
    });
  }
};

// Update food controller
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this id",
      });
    }

    const {
      title,
      foodTags,
      description,
      price,
      imageUrl,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title: title || food.title,
        foodTags: foodTags || food.foodTags,
        description: description || food.description,
        price: price || food.price,
        imageUrl: imageUrl || food.imageUrl,
        category: category || food.category,
        code: code || food.code,
        isAvailable: isAvailable !== undefined ? isAvailable : food.isAvailable,
        resturant: resturant || food.resturant,
        rating: rating || food.rating,
        ratingCount: ratingCount || food.ratingCount,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      success: true,
      message: "Food item updated successfully",
      updatedFood,
    });
  } catch (error) {
    console.log("Error in updateFoodController:", error);
    res.status(500).send({
      success: false,
      message: "Error in update food API",
      error,
    });
  }
};

// Delete food by id controller
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    // Check if food ID is provided
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide food id",
      });
    }
    // Find and delete the food item by ID
    const food = await foodModel.findByIdAndDelete(foodId);
    // Check if the food item was found and deleted
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteFoodController:", error);
    res.status(500).send({
      success: false,
      message: "Error in delete food API",
      error,
    });
  }
};

// Place Order Controller
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(400).send({
        success: false,
        message: "Please provide food cart and payment method",
      });
    }
    let total = 0;

    // Calculate price
    cart.forEach((item) => {
      total += item.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();
    res.status(200).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log("Error in placeOrderController:", error);
    res.status(500).send({
      success: false,
      message: "Error in place order API",
      error,
    });
  }
};

// Change Order Status Controller
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide a valid order id",
      });
    }
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "No order found with this id",
      });
    }
    await order.save();
    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("Error in orderStatusController:", error);
    res.status(500).send({
      success: false,
      message: "Error in order status API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
