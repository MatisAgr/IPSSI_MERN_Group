const User = require("../Models/usersModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
  try {
    console.log("Register request received:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log("All fields are required");
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format");
      return res.status(400).json({ error: "Format d'email invalide" });
    }

    if (password.length < 6) {
      console.log("Password must be at least 6 characters long");
      return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log("Username or email already exists");
      return res.status(400).json({ error: "Le nom d'utilisateur ou l'email existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("User registered:", user);

    res.status(201).json({ message: "Utilisateur enregistré avec succès", user });
  } catch (error) {
    console.log("Error registering user:", error.message);
    res.status(400).json({ error: "Erreur lors de l'enregistrement de l'utilisateur" });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("Login request received:", req.body);
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      console.log("User not found");
      return res.status(404).send({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).send({ error: "Invalid password" });
    }

    if (!process.env.JWT_SECRET) {
      console.log("JWT secret is not defined");
      return res.status(500).send({ error: "Internal server error" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRES_IN } // Options
    );

    console.log("Login successful, token generated");
    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    console.log("Error logging in user:", error.message);
    res.status(400).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Update request received:", userId, req.body);

    // Filtrer les champs vides
    const updates = {};
    for (const key in req.body) {
      if (req.body[key] !== '') {
        updates[key] = req.body[key];
      }
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      console.log("User not found");
      return res.status(404).send({ error: "User not found" });
    }

    console.log("User updated:", user);
    res.status(200).send(user);
  } catch (error) {
    console.log("Error updating user:", error.message);
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Delete request received:", userId);


    // Supprimer l'utilisateur
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).send({ error: "User not found" });
    }
    console.log("User and associated announces deleted:", user);
    res.status(200).send(user);
  } catch (error) {
    console.log("Error deleting user:", error.message);
    res.status(400).send({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error fetching user profile:", error.message);
    res.status(400).send({ error: error.message });
  }
};


module.exports = { registerUser, loginUser, updateUser, deleteUser, getUserProfile };