const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteByIdCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

// CREATE CATEGORY || POST
router.post("/create", authMiddleware, createCategoryController);

// GET ALL CATEGORY || GET
router.get("/getAll", authMiddleware, getAllCategoryController);

// UPDATE BASE ON ID CATEGORY || PUT
router.put("/update/:id", authMiddleware, updateCategoryController);

// DELETE BASE ON ID CATEGORY || DELETE
router.delete("/delete/:id", authMiddleware, deleteByIdCategoryController);

module.exports = router;
