// src/components/StoryCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const StoryCard = ({ story }) => {
  return (
    <div>
      <h3>{story.title}</h3>
      <p>{story.description}</p>
      <Link to={`/story/${story.id}`}>Read More</Link>
    </div>
  );
};

export default StoryCard;
