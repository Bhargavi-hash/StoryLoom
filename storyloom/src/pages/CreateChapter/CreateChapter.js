import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CreateChapter() {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, title, content, published }),
    });
    const data = await res.json();
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="container">
      <h2>Create Chapter</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="form-control mb-2" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={10} className="form-control mb-2" />
        <select
          value={published ? "published" : "draft"}
          onChange={(e) => setPublished(e.target.value === "published" )} className="form-control mb-2">
          <option value="draft">Save as Draft</option>
          <option value="published">Publish</option>
        </select>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default CreateChapter;

