const express = require("express");
const Book = require("../models/Book");
const User = require("../models/User");

const router = express.Router();

// Add a new book
router.post("/add", async (req, res) => {
  try {
    const { title, authorId, coverImage, description, genre } = req.body;

    // Check if user exists
    const user = await User.findById(authorId);
    if (!user) return res.status(404).json({ message: "Author not found" });

    // Create and save the book
    const newBook = new Book({ title, authorId: authorId, coverImage, description, genre });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// GET all books or by genre
router.get('/', async (req, res) => {
  try {
    const genreFilter = req.query.genre; // e.g. /api/books?genre=Fantasy

    const query = genreFilter ? { genre: genreFilter } : {};



    const books = await Book.find(query).populate('authorId', 'username');

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
});

router.post("/create-book", async (req, res) => {
  try {
    const {
      title,
      published,
      abbreviation,
      description,
      genre,
      tags,
      language,
      warnings,
      coverImage,
      contestParticipation,
      authorId,
    } = req.body;

    const newBook = new Book({
      title,
      published: false, // <- Always start the new book as a draft
      abbreviation,
      description,
      genre,
      tags,
      language,
      warnings,
      coverImage,
      contestParticipation,
      authorId,
      chapters: [], // Initially empty
      LibraryAdditions: 0,
    });

    await newBook.save();

    // Update the user's books array
    await User.findByIdAndUpdate(authorId, { $push: { books: newBook._id } });

    res.status(201).json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Failed to create book", error: error.message });
  }
});

router.put("/:bookId/publish", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.bookId,
      { published: true },
      { new: true }
    );
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to publish book." });
  }
});



module.exports = router;
