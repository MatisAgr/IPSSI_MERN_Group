const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const ownerCheckMiddleware = require("../Middleware/ownerCheckMiddleware");

const { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById, getProductsByUserId } = require("../Controllers/productController");

router.post("/create", authMiddleware, createProduct);
router.put("/update", ownerCheckMiddleware, updateProduct);
router.delete("/delete/:id", ownerCheckMiddleware, deleteProduct);
router.get("/get", getAllProducts);
router.get("/get/:id", getProductById);
router.get("/get/user/:userId", getProductsByUserId);

module.exports = router;