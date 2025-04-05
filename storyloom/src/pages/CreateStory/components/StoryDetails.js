// import { useState } from "react";
import "../../../styles/storyDetails.css";

function StoryDetails({ title, setTitle, abbreviation, setAbbreviation, description, setDescription }) {
  return (
    <div className="story-details">
      <label>Book Name:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <br></br>
      <label>Abbreviation:</label>
        <input type="text" value={abbreviation} onChange={(e) => setAbbreviation(e.target.value)} required />
        <br></br>
      <label>Synopsis:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
    </div>
  );
}

export default StoryDetails;
