const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserProfile,
} = require("./Controllers/userController");


const authMiddleware = require("./Middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/me", authMiddleware, getUserProfile);
router.put("/user/update/me", authMiddleware, updateUser);
router.delete("/user/delete/me", authMiddleware, deleteUser);

module.exports = router;