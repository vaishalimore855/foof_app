// module.exports = router;
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();
// CREATE FOOD || POST
router.post("/create", authMiddleware, createFoodController);

// GET ALL FOOD || GET
router.get("/getAll", authMiddleware, getAllFoodController);

// GET Single FOOD || GET
router.get("/get/:id", authMiddleware, getSingleFoodController);

// GET FOOD BY RESTAURANT || GET
router.get("/getByResturant/:id", authMiddleware, getFoodByResturantController);

// UPDATE BASED ON ID FOOD || PUT
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE BASED ON ID FOOD || DELETE
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// Place Order || POST
router.post("/placeorder", authMiddleware, placeOrderController);

// Order Status || POST
router.post(
  "/orderstatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

module.exports = router;
