function ContestParticipation() {
    return (
      <div className="story-details">
        <label>Participating in a Contest?</label>
        <select className="dropdown">
          <option value="">None</option>
          <option value="fantasy2024">Fantasy Writing Contest</option>
          <option value="romance2024">Romance Writing Contest</option>
        </select>
      </div>
    );
  }
  
  export default ContestParticipation;
  