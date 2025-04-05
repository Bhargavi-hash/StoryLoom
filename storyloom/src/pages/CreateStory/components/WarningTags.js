function Warnings({warnings, setWarnings}) {
    return (
      <div className="story-details">
        <label>Content Warnings:</label>
        <input type="text" placeholder="Violence, Strong Language, Mature Themes..." value={warnings} onChange={(e) => setWarnings(e.target.value)} />
      </div>
    );
  }
  
  export default Warnings;
  