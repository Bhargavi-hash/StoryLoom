const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  usertype: { type: String, enum: ["reader", "writer"], default: "reader" }, // User type (reader/writer)
  profilePic: { type: String, default: "" }, // URL of profile image
  country: { type: String, default: "" },
  bio: { type: String, maxlength: 100 },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }], // User's books
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // User's posts
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // User's comments
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Followers
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Following
  library: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }], // Saved books
});

module.exports = mongoose.model("User", UserSchema);
