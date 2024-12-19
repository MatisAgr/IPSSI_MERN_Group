const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token du header

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user; // Ajoute les infos utilisateur à req.user
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;