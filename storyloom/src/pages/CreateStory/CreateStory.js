import React, { useState } from "react";

import StoryDetails from "./components/StoryDetails";
import UploadImages from "./components/UploadCover";
import GenreTags from "./components/GenreTags";
import Warnings from "./components/WarningTags";
import LanguageOptions from "./components/Language";
import ContestParticipation from "./components/Contest";
// import CharacterUploads from "./components/CharacterImageUpload";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateStory.css";

function CreateStory() {

  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);
  const [abbreviation, setAbbreviation] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState([]);
  const [tags, setTags] = useState([]);
  const [language, setLanguage] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [contest, setContest] = useState(false);

  const navigate = useNavigate();

  const getUserIdFromUsername = async (username) => {
    const response = await fetch(`http://localhost:5000/api/auth/profile/${username}`);
    const user = await response.json();
    console.log(user);
    return user._id; // Assuming the user object has an _id property
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const authorId = await getUserIdFromUsername(username);

    const newBook = {
      title,
      published,
      abbreviation,
      description,
      genre,
      tags,
      language,
      warnings,
      coverImage,
      contest,
      authorId,
    };

    try {
      const response = await fetch("http://localhost:5000/api/books/create-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create book");
      }

      const data = await response.json();
      console.log("📚 Book created successfully:", data);

      navigate("/my-stories");
    } catch (error) {
      console.error("❌ Error creating book:", error.message);
      alert("Something went wrong while creating the book. Check the console.");
    }
  };

  return (
    <div className="create-story-container">
      {/* <h2>📖 Create a New Story</h2> */}
      <form onSubmit={handleSubmit}>
        <StoryDetails title={title} setTitle={setTitle} abbreviation={abbreviation} setAbbreviation={setAbbreviation} description={description} setDescription={setDescription} />
        <UploadImages coverImage={coverImage} setCoverImage={setCoverImage} />
        <LanguageOptions language={language} setLanguage={setLanguage} />
        <GenreTags genre={genre} setGenre={setGenre} tags={tags} setTags={setTags} />
        <Warnings warnings={warnings} setWarnings={setWarnings} />
        <ContestParticipation contest={contest} setContest={setContest} />

        {/* <CharacterUploads /> */}

        <button type="submit" className="submit-btn">Create</button>
        {/* <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button> */}
      </form>
    </div>
  );
}

export default CreateStory;

