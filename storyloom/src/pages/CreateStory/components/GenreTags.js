function GenreTags() {
    return (
      <div className="story-details">
        <label>Genre:</label>
        <input type="text" placeholder="Fantasy, Romance, Mystery..." required />
        <br></br>
        <label>Tags:</label>
        <input type="text" placeholder="Magic, Kingdom, Time Travel..." required />
      </div>
    );
  }
  
  export default GenreTags;
  