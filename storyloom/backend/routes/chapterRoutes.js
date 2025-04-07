const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');
const Book = require('../models/Book');

// Create a chapter and update Book's chapter array
router.post('/', async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();

    await Book.findByIdAndUpdate(chapter.bookId, {
      $push: { chapters: chapter._id },
    });

    // If it's the first published chapter, mark the book as published
    if (chapter.status === 'published') {
      const publishedCount = await Chapter.countDocuments({ bookId: chapter.bookId, status: 'published' });
      if (publishedCount === 1) {
        await Book.findByIdAndUpdate(chapter.bookId, { published: true });
      }
    }

    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single chapter
router.get('/:chapterId', async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update chapter
router.put('/:id', async (req, res) => {
  try {
    const updated = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

