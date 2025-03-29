import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStory() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const saveStory = () => {
    const stories = JSON.parse(localStorage.getItem("stories")) || [];
    const newStory = { id: Date.now(), title, content };
    stories.push(newStory);
    localStorage.setItem("stories", JSON.stringify(stories));
    navigate('/browse');
  };

  return (
    <div>
      <h1>Create a New Story</h1>
      <input type="text" placeholder="Story Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Write your story here..." value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={saveStory}>Publish</button>
    </div>
  );
}

export default CreateStory;

