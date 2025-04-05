function Warnings({contentWarnings, setWarning}) {
    return (
      <div className="story-details">
        <label>Content Warnings:</label>
        <input type="text" placeholder="Violence, Strong Language, Mature Themes..." value={contentWarnings} onchange={(e) => setWarning(e.target.value)} />
      </div>
    );
  }
  
  export default Warnings;
  