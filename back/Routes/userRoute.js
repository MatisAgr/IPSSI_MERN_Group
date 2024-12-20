const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const { registerUser, loginUser, updateUser, deleteUser, getUserProfile } = require("../Controllers/userController");

router.post("/create", registerUser);
router.post("/login", loginUser);
router.get("/get/:id", getUserProfile);
router.put("/update/:id",authMiddleware, updateUser);
router.delete("/delete/:id",authMiddleware, deleteUser);


module.exports = router;