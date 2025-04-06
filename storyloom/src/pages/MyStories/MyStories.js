import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyStories() {
  const [books, setBooks] = useState([]);

  // 🔁 Fetch the user's stories
  const fetchMyStories = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await fetch(`http://localhost:5000/api/auth/profile/${username}`);
      const data = await response.json();
      setBooks(data.books || []);
    } catch (error) {
      console.error("🛑 Failed to fetch stories:", error);
    }
  };

  // 🚀 Handle the publish action
  const handlePublish = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}/publish`, {
        method: "PUT", // ✅ Make sure this matches your backend route
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to publish the story");
      }

      const data = await response.json();
      console.log("✅ Story published successfully:", data);

      // ⏳ Refresh the story list to show updated publish status
      fetchMyStories();
    } catch (error) {
      console.error("🛑 Failed to publish the story:", error);
    }
  };

  useEffect(() => {
    fetchMyStories();
  }, []);

  return (
    <div className="my-stories">
      <h2>📚 My Stories</h2>
      <Link to="/create-story" className="create-btn">➕ Create New Story</Link>

      <div className="story-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="story-card" key={book._id}>
              📖 {book.title}
              {" "}
              ({book.published ? "Published" : "Unpublished"})

              {!book.published && (
                <button onClick={() => handlePublish(book._id)}>🚀 Publish</button>
              )}
            </div>
          ))
        ) : (
          <p>No stories yet... go spin some magic! ✨</p>
        )}
      </div>
    </div>
  );
}

export default MyStories;
