const Product = require("../Models/usersProduct");
const User = require("../Models/usersModel");

const dotenv = require("dotenv");

dotenv.config();


const createProduct = async (req, res) => {
    try {
        console.log("Product creation request received:", req.body);
    
        const { name, description, price, category, owner } = req.body;
    
        if (!name || !price || !category || !owner) {
        console.log("All fields are required");
        return res.status(400).json({ error: "Tous les champs sont requis" });
        }
    
        const product = new Product({
        name,
        description,
        price,
        category,
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
        console.log("Product update request received:", req.body);
    
        const { name, description, price, category, owner } = req.body;
    
        if (!name || !price || !category || !owner) {
        console.log("All fields are required");
        return res.status(400).json({ error: "Tous les champs sont requis" });
        }
    
        const product = new Product({
        name,
        description,
        price,
        category,
        owner,
        });
    
        await product.save();
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
        const products = await Product.find();
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
        "owner",
        "username email"
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