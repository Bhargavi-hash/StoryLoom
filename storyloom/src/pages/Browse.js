import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { Card, Button } from 'react-bootstrap';

function Browse() {
  const [stories, setStories] = useState([]);
  const [userLibrary, setUserLibrary] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch stories
  const fetchStories = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books");
      if (!response.ok) throw new Error("Failed to fetch stories");

      const data = await response.json();
      const books = data.filter((book) => book.published === true);
      setStories(books || []);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  }, []);

  // Fetch user library
  const fetchUserLibrary = useCallback(async () => {
    if (!user?._id) return;
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}/library`);
      const data = await response.json();

      // Normalize to just book IDs even if populated
      const bookIds = data.map(book =>
        typeof book === 'string' ? book : book._id
      );

      setUserLibrary(bookIds);
    } catch (error) {
      console.error("Error fetching user library:", error);
    }
  }, [user]);

  // Load stories and user library on mount or user change
  useEffect(() => {
    fetchStories();
    fetchUserLibrary();
  }, [fetchStories, fetchUserLibrary]);

  // Add/Remove book from library
  const handleToggleLibrary = async (bookId) => {
    const isInLibrary = userLibrary.includes(bookId);
    const endpoint = isInLibrary ? "remove-from-library" : "add-to-library";

    try {
      const res = await fetch(`http://localhost:5000/api/users/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, bookId }),
      });

      const data = await res.json();
      alert(data.message);

      // Update local state for instant UI feedback
      if (isInLibrary) {
        setUserLibrary((prev) => prev.filter((id) => id !== bookId));
      } else {
        setUserLibrary((prev) => [...prev, bookId]);
      }

      // Update libraryAdditions count locally
      setStories((prev) =>
        prev.map((story) =>
          story._id === bookId
            ? {
                ...story,
                LibraryAdditions: isInLibrary
                  ? (story.LibraryAdditions || 1) - 1
                  : (story.LibraryAdditions || 0) + 1,
              }
            : story
        )
      );

    } catch (error) {
      console.error("Error updating library:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">📚 Browse Stories</h1>

      {stories.length === 0 ? (
        <p>No stories available.</p>
      ) : (
        <div>
          {stories.map((story) => {
            const isInLibrary = userLibrary.includes(story._id);

            return (
              <Card key={story._id} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/story/${story._id}`} style={{ color: '#007bff' }}>
                      {story.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>{story.description}</Card.Text>
                  <Card.Subtitle className="text-muted">Genre: {story.genre}</Card.Subtitle>
                  <Card.Subtitle className="text-muted">Author: {story.authorId?.username || "Unknown"}</Card.Subtitle>
                  <Card.Text>📌 Collections: {story.LibraryAdditions || 0}</Card.Text>
                  {user && (
                    <Button
                      variant={isInLibrary ? "danger" : "primary"}
                      onClick={() => handleToggleLibrary(story._id)}
                    >
                      {isInLibrary ? "❌ Remove from Library" : "📚 Add to Library"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Browse;

