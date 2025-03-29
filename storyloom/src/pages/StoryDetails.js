import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const stories = JSON.parse(localStorage.getItem("stories")) || [];
    const foundStory = stories.find(story => story.id === parseInt(id));
    setStory(foundStory);
  }, [id]);

  if (!story) return <h2>Story not found.</h2>;

  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.content}</p>
    </div>
  );
}

export default StoryDetails;

