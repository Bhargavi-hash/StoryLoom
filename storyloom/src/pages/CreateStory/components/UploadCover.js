// src/pages/CreateStory/components/UploadImages.js
import React, { useState } from "react";
import "../../../styles/storyDetails.css";

function UploadImages() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="story-details">
      <label>Upload Cover Image:</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Story Cover" className="preview-img" />}
    </div>
  );
}

export default UploadImages; // Ensure default export
