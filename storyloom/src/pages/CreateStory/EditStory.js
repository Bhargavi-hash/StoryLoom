import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import StoryDetails from "./components/StoryDetails";
import UploadImages from "./components/UploadCover";
import GenreTags from "./components/GenreTags";
import Warnings from "./components/WarningTags";
import LanguageOptions from "./components/Language";
import ContestParticipation from "./components/Contest";
import StoryStatus from "./components/Status";

import "../../styles/CreateStory.css";

function EditStory() {
  const { id: bookId } = useParams();
  const navigate = useNavigate();

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
  const [status, setStatus] = useState("Ongoing");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${bookId}`);
        const book = await response.json();

        setTitle(book.title);
        setPublished(book.published);
        setAbbreviation(book.abbreviation);
        setDescription(book.description);
        setGenre(book.genre || []);
        setTags(book.tags || []);
        setLanguage(book.language);
        setWarnings(book.warnings || []);
        setCoverImage(book.coverImage);
        setContest(book.contest);
        setStatus(book.status || "Ongoing");
      } catch (error) {
        console.error("❌ Failed to load book details:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedBook = {
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
      status,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update book");
      }

      const data = await response.json();
      console.log("✅ Book updated successfully:", data);
      navigate("/my-stories");
    } catch (error) {
      console.error("❌ Error updating book:", error.message);
      alert("Something went wrong while updating the book. Check the console.");
    }
  };

  return (
    <div className="create-story-container">
      <form onSubmit={handleUpdate}>
        <StoryDetails title={title} setTitle={setTitle} abbreviation={abbreviation} setAbbreviation={setAbbreviation} description={description} setDescription={setDescription} />
        <UploadImages coverImage={coverImage} setCoverImage={setCoverImage} />
        <LanguageOptions language={language} setLanguage={setLanguage} />
        <GenreTags genre={genre} setGenre={setGenre} tags={tags} setTags={setTags} />
        <Warnings warnings={warnings} setWarnings={setWarnings} />
        <ContestParticipation contest={contest} setContest={setContest} />
        <StoryStatus status={status} setStatus={setStatus} />

        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
}

export default EditStory;

