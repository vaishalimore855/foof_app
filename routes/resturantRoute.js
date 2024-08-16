const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantController");
const router = express.Router();

// ROUTER
//CREATE resturant || POST
router.post("/create", authMiddleware, createResturantController);

//GET ALL Resturant ||GET
router.get("/getAll", authMiddleware, getAllResturantController);

//GET Resturant By ID || GET
router.get("/get/:id", getResturantByIdController);

//DELETE Resturant  || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);
module.exports = router;
