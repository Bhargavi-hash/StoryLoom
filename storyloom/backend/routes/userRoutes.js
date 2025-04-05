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

    console.log("🔍 Before Update - Book Collections:", book.LibraryAdditions);

    if (!user.library.some(id => id.equals(book._id))) {
      user.library.push(book._id);
      book.LibraryAdditions = (book.LibraryAdditions || 0) + 1; // Increment the count
      await user.save();
      await book.save();

      console.log("✅ After Update - Book Collections:", book.LibraryAdditions);
      console.log("✅ Book added to user library");
    }

    res.status(200).json({ message: "Book added to library", library: user.library });

  } catch (error) {
    console.error("🔥 Caught Error in add-to-library:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:id/library", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("library");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.library);
  } catch (error) {
    console.error("🔥 Error fetching library:", error);
    res.status(500).json({ message: "Failed to fetch library", error: error.message });
  }
});

router.post("/remove-from-library", async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.library = user.library.filter(id => id.toString() !== bookId);
    await user.save();

    // Optionally decrease the book's collection count
    await Book.findByIdAndUpdate(bookId, { $inc: { LibraryAdditions: -1 } });

    res.status(200).json({ message: "Book removed from library" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



module.exports = router;
