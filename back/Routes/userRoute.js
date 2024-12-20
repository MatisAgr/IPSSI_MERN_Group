const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const { registerUser, loginUser, updateUser, deleteUser, getUserProfile, getUserById } = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getid/:userId", getUserById);

router.get("/get/me",authMiddleware, getUserProfile);
router.put("/update/me",authMiddleware, updateUser);
router.delete("/delete/me",authMiddleware, deleteUser);


module.exports = router;