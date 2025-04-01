import React, { useState } from "react";
import { FaPlusCircle ,FaUpload } from "react-icons/fa";
import "../../../styles/uploadimage.css";

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
    <div className="upload-container">
      <p>Book Cover:</p>
      <label htmlFor="file-upload" className="upload-box">
        {image ? (
          <img src={image} alt="Story Cover" className="preview-img" />
        ) : (
          <div className="placeholder">
            <FaPlusCircle className="plus-icon" />
          </div>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        hidden
      />
      <button className="upload-button" onClick={() => document.getElementById("file-upload").click()}>
      <FaUpload className="button-icon" /> Upload
      </button>
    </div>
  );
}

export default UploadImages;
