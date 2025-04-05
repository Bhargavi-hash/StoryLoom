import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { Card, Button } from 'react-bootstrap';

function Library() {
  const [libraryBooks, setLibraryBooks] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch books in user's library
  const fetchLibrary = useCallback(async () => {
    if (!user?._id) return;
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}/library`);
      const data = await response.json();
      setLibraryBooks(data);
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);

  // Remove book from library
  const handleRemove = async (bookId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/remove-from-library`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, bookId }),
      });

      const data = await res.json();
      alert(data.message);

      // Remove from frontend
      setLibraryBooks(prev => prev.filter(book => book._id !== bookId));
    } catch (error) {
      console.error("Error removing from library:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">📚 My Library</h1>

      {libraryBooks.length === 0 ? (
        <p>You haven’t added any books yet.</p>
      ) : (
        libraryBooks.map(book => (
          <Card key={book._id} className="mb-3">
            <Card.Body>
              <Card.Title>
                <Link to={`/story/${book._id}`} style={{ color: '#007bff' }}>
                  {book.title}
                </Link>
              </Card.Title>
              <Card.Text>{book.description}</Card.Text>
              <Card.Subtitle className="text-muted">Genre: {book.genre}</Card.Subtitle>
              <Card.Subtitle className="text-muted">Author: {book.authorId?.username || "Unknown"}</Card.Subtitle>
              <Card.Text>📌 Collections: {book.LibraryAdditions || 0}</Card.Text>
              <Button variant="danger" onClick={() => handleRemove(book._id)}>
                ❌ Remove from Library
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default Library;


