import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Library() {
  const { user } = useContext(AuthContext);
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${user._id}/library`);
        const data = await res.json();
        setLibrary(data);
      } catch (err) {
        console.error("Failed to fetch library:", err);
      }
    };

    if (user) fetchLibrary();
  }, [user]);

  return (
    <div className="container">
      <h2 className="text-center">📚 My Library</h2>
      {library.length === 0 ? (
        <p>You haven't added any books yet.</p>
      ) : (
        library.map(book => (
          <Card key={book._id} className="mb-3">
            <Card.Body>
              <Card.Title>
                <Link to={`/story/${book._id}`} style={{ color: '#007bff' }}>
                  {book.title}
                </Link>
              </Card.Title>
              <Card.Text>{book.description}</Card.Text>
              <Card.Subtitle className="text-muted">
                Genre: {book.genre}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default Library;
