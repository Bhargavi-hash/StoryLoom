import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateBook.css";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Book Created:", { title, genre, description });

    // TODO: Save book to database

    navigate("/my-stories"); // Redirect to My Stories after submission
  };

  return (
    <div className="create-book-container">
      <h2>📖 Create a New Book</h2>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit" className="submit-btn">Create Book</button>
        <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateBook;
