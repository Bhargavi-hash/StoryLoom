import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditChapter = () => {
  const { id: chapterId, bookId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/chapters/${chapterId}`);
        if (!res.ok) throw new Error('Failed to fetch chapter');
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setPublished(data.published);
      } catch (err) {
        console.error('Error loading chapter:', err);
      }
    };

    fetchChapter();
  }, [chapterId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/chapters/${chapterId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          published,
        }),
      });

      if (!res.ok) throw new Error('Failed to update chapter');
      navigate(-1); // Go back to the previous page
    } catch (err) {
      console.error('Error updating chapter:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Chapter</h2>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Chapter Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Chapter Content"
          rows={10}
          required
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Publish
        </label>
        <button type="submit">Update Chapter</button>
      </form>
    </div>
  );
};

export default EditChapter;
