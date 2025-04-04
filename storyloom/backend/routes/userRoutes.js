const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/Book");

router.post("/add-to-library", async (req, res) => {
    const { userId, bookId } = req.body;
  
    console.log("Incoming Request:", req.body);
  
    try {
      if (!userId || !bookId) {
        console.log("Missing IDs");
        return res.status(400).json({ message: "Missing userId or bookId" });
      }
  
      const user = await User.findById(userId);
      const book = await Book.findById(bookId);
  
      console.log("User:", user);
      console.log("Book:", book);
  
      if (!user || !book) {
        return res.status(404).json({ message: "User or Book not found" });
      }
  
      if (!user.library.some(id => id.equals(book._id))) {
        user.library.push(book._id);
        await user.save();
        console.log("✅ Book added to user library");
      }
  
      res.status(200).json({ message: "Book added to library", library: user.library });
  
    } catch (error) {
      console.error("🔥 Caught Error in add-to-library:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

module.exports = router;
