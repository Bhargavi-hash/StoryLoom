const express = require("express");
const User = require("../models/User");
const Book = require("../models/Book");
const Post = require("../models/Post");


const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
  try {
    const { username, profilePic, country, bio } = req.body;

    // Check if the username already exists
    let existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already taken" });

    const newUser = new User({ username, profilePic, country, bio });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get user profile by username (FIXED)
router.get("/profile/:username", async (req, res) => {
    try {
      console.log("API Request received for:", req.params.username);
      
      const user = await User.findOne({ username: req.params.username }).populate("books posts");
      
      if (!user) {
        console.log("User not found in database");
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has books and posts
      user.books = user.books.filter(book => book !== null);  
      user.posts = user.posts.filter(post => post !== null);
  
      console.log("Sending user data:", user);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });

module.exports = router;

