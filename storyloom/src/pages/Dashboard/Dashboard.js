import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>📊 Dashboard</h2>
      <div className="stats-container">
        <div className="stat-box">👁️ Views: 10,234</div>
        <div className="stat-box">⭐ Votes: 520</div>
        <div className="stat-box">📖 Library Adds: 1,200</div>
        <div className="stat-box">📝 Chapters Uploaded: 30</div>
        <div className="stat-box">✍️ Words Published: 45,000</div>
        <div className="stat-box">💬 Reviews: 85</div>
      </div>
      
      <Link to="/create-story" className="create-btn">Create New Story</Link>
    </div>
  );
}

export default Dashboard;
