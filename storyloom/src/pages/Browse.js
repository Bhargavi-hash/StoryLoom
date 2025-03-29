import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { Card, Button } from 'react-bootstrap'; // Use Bootstrap components

function Browse() {
  const [stories, setStories] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    setStories(savedStories);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">📚 Browse Stories</h1>

      {user && (
        <Link to="/create">
          <Button className="w-100 my-3">✍️ Write a New Story</Button>
        </Link>
      )}

      {stories.length === 0 ? <p>No stories available.</p> : (
        <div>
          {stories.map(story => (
            <Card key={story.id} className="mb-3">
              <Card.Body>
                <Card.Title>
                  <Link to={`/story/${story.id}`} style={{ color: '#007bff' }}>
                    {story.title}
                  </Link>
                </Card.Title>
                <Card.Text>{story.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Browse;

