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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Story Created Successfully");
    navigate("/my-stories"); // Redirect after submission
  };

  return (
    <div className="create-story-container">
      {/* <h2>📖 Create a New Story</h2> */}
      <form onSubmit={handleSubmit}>
        <StoryDetails />
        <UploadImages />
        <LanguageOptions />
        <GenreTags />
        <Warnings />
        <ContestParticipation />
        {/* <CharacterUploads /> */}
        
        <button type="submit" className="submit-btn">Create</button>
        {/* <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button> */}
      </form>
    </div>
  );
}

export default CreateStory;
