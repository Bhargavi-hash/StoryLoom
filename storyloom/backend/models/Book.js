const mongoose = require("mongoose");
const { MdLibraryAdd } = require("react-icons/md");
const { PiTagSimple } = require("react-icons/pi");
const { TfiAgenda } = require("react-icons/tfi");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String },
  genre: { type: String },
  tags: [{ type: String }],
  contest: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
  cover: { type: String },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
    LibraryAdditions: { type: Number, default: 0 },                                                                     
    votes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", BookSchema);
