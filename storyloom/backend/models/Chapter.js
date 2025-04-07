const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Reference to the Book model
    published: { type: Boolean, default: false }, // Published status
    // order: { type: Number, required: true }, // Order of the chapter in the book
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chapter", ChapterSchema);