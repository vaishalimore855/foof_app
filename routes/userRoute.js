const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// ROUTER
// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// UPDATE USER || UPDATE
router.put("/updateUser", authMiddleware, updateUserController);

// RESET PASSWORD || RESET
router.post("/restPassword", authMiddleware, resetPasswordController);

// UPDATE PASSWORD || UPDATE
router.post("/updatePassword", authMiddleware, updatePasswordController);

// DELETE USER || DELETE
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
