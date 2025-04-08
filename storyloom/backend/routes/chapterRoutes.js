const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');
const Book = require('../models/Book');

// Create a chapter and update Book's chapter array
router.post('/', async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();

    // Add the chapter to the book
    await Book.findByIdAndUpdate(chapter.bookId, {
      $push: { chapters: chapter._id },
    });

    // If this is the first published chapter, publish the book too
    if (chapter.published === true) {
      const publishedCount = await Chapter.countDocuments({
        bookId: chapter.bookId,
        published: true,
      });

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
    const oldChapter = await Chapter.findById(req.params.id);
    const updatedChapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // If the chapter just changed from unpublished to published
    if (!oldChapter.published && req.body.published === true) {
      const publishedCount = await Chapter.countDocuments({
        bookId: updatedChapter.bookId,
        published: true,
      });

      if (publishedCount === 1) {
        await Book.findByIdAndUpdate(updatedChapter.bookId, { published: true });
      }
    }

    res.json(updatedChapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

