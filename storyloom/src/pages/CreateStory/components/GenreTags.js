function GenreTags( { genre, setGenre, tags, setTags }) {
    return (
      <div className="story-details">
        <label>Genre:</label>
        <input type="text" placeholder="Fantasy, Romance, Mystery..." value={genre} onChange={(e) => setGenre(e.target.value)} required />
        <br></br>
        <label>Tags:</label>
        <input type="text" placeholder="Magic, Kingdom, Time Travel..." value={tags} onChange={(e) => setTags(e.target.value)} required />
      </div>
    );
  }
  
  export default GenreTags;
  