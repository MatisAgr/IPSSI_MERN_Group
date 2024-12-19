const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserProfile,
} = require("./Controllers/userController");


const {
  createAnnounce,
  getAllAnnounces,
  getAnnounceById,
  updateAnnounce,
  deleteAnnounce,
  getUserAnnounces,
} = require("./Controllers/announceController");

const authMiddleware = require("./Middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/me", authMiddleware, getUserProfile);
router.put("/user/update/me", authMiddleware, updateUser);
router.delete("/user/delete/me", authMiddleware, deleteUser);

router.post("/create", authMiddleware, createAnnounce);
router.get("/announces", getAllAnnounces);
router.get("/announce/:id", getAnnounceById);
router.put("/announce/:id", authMiddleware, updateAnnounce);
router.delete("/announce/:id", authMiddleware, deleteAnnounce);
router.get("/announces/me", authMiddleware, getUserAnnounces);


module.exports = router;