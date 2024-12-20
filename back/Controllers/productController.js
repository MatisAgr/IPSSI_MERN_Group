const Product = require("../Models/productsModel");
const User = require("../Models/usersModel");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();


const createProduct = async (req, res) => {
    try {
      console.log("Product creation request received:", req.body);
  
      const { name, description, price, category, images } = req.body;
  
      token = req.headers.authorization?.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const owner = decodedToken.id;
  
      if (!name || !price || !category || !images || !owner) {
        console.log("All fields are required");
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const product = new Product({
        name,
        description,
        price,
        category,
        images,
        owner,
      });
  
      await product.save();
      console.log("Product created:", product);
  
      res.status(201).json({ message: "Produit créé avec succès", product });
    } catch (error) {
      console.log("Error creating product:", error.message);
      res.status(400).json({ error: "Erreur lors de la création du produit" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, images } = req.body;
    
        if (!name || !price || !category || images) {
        console.log("All fields are required");
        return res.status(400).json({ error: "Tous les champs sont requis" });
        }
    
        const product = await Product.findByIdAndUpdate(
        id,
        { name, description, price, category, images },
        { new: true }
        );
    
        console.log("Product updated:", product);
    
        res.status(201).json({ message: "Produit mis à jour avec succès", product });
    } catch (error) {
        console.log("Error updating product:", error.message);
        res.status(400).json({ error: "Erreur lors de la mise à jour du produit" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params.id;
    
        if (!id) {
        console.log("All fields are required");
        return res.status(400).json({ error: "Tous les champs sont requis" });
        }
    
        const product = await Product.findByIdAndDelete(id);
    
        console.log("Product deleted:", product);
    
        res.status(201).json({ message: "Produit supprimé avec succès", product });
    } catch (error) {
        console.log("Error deleting product:", error.message);
        res.status(400).json({ error: "Erreur lors de la suppression du produit" });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('user', 'username email');
        console.log("All products:", products);
        res.status(200).json({ products });
    } catch (error) {
        console.log("Error getting all products:", error.message);
        res.status(400).json({ error: "Erreur lors de la récupération des produits" });
    }
};

const getProductsByUserId = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.params.userId }).populate(
      "owner", // Champ "owner" référencé dans le schéma
      "username email" // Champs peuplés depuis le modèle "Users"
    );

    if (!products || products.length === 0) {
      return res.status(404).send({ error: "Aucun produit trouvé pour cet utilisateur" });
    }

    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products by user ID:", error.message);
    res.status(500).send({ message: "Erreur lors de la récupération des produits" });
  }
};
 
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log("Product:", product);
        res.status(200).json({ product });
    } catch (error) {
        console.log("Error getting product by ID:", error.message);
        res.status(400).json({ error: "Erreur lors de la récupération du produit" });
    }
};
module.exports = { createProduct, updateProduct, deleteProduct, getAllProducts, getProductsByUserId, getProductById };