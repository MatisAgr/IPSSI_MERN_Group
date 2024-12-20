const jwt = require("jsonwebtoken");
const User = require("../Models/usersModel");
const Product = require("../Models/productsModel");


const checkProductOwnership = async (req, res, next) => {
    try {
        const productId = req.params.id; // Récupérer l'ID du produit à partir des paramètres de la requête
        const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token du header

        const userId = jwt.verify(token, process.env.JWT_SECRET).id; // Décoder le token pour obtenir l'ID de l'utilisateur

        // Rechercher le produit dans la base de données
        const product = await Product.findById(productId);

        if (!product) {
        return res.status(404).json({ error: "Produit introuvable" });
        }

        // Vérifier que l'utilisateur connecté est le propriétaire du produit
        if (product.owner.toString() !== userId) {
        return res.status(403).json({
            error: "Accès interdit : Vous n'êtes pas le propriétaire de ce produit",
        });
        }

        req.product = product; // Ajouter le produit à req pour une utilisation dans le contrôleur
        next(); // Passer au middleware suivant ou au contrôleur
    } catch (err) {
        console.error("Erreur lors de la vérification de la propriété :", err.message);
        res.status(500).json({ error: "Erreur serveur lors de la vérification de la propriété" });
    }
};

module.exports = checkProductOwnership;


