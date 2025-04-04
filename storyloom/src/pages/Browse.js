import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { Card, Button } from 'react-bootstrap';

function Browse() {
  const [stories, setStories] = useState([]);
  const { user } = useContext(AuthContext);

  const handleAddToCollection = async (bookId) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/add-to-library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, bookId }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("Error adding to collection:", error);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        if (!response.ok) throw new Error("Failed to fetch stories");

        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">📚 Browse Stories</h1>

      {stories.length === 0 ? (
        <p>No stories available.</p>
      ) : (
        <div>
          {stories.map((story) => (
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

                {user && (
                  <Button
                    // className="mt-2"
                    onClick={() => handleAddToCollection(story._id)}
                  >
                    📚 Add to Library
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Browse;

