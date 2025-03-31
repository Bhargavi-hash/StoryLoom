import React, { useState } from "react";
import "../styles/CreatePage.css"; // Import styles
import Dashboard from "./Dashboard/Dashboard";
import MyStories from "./MyStories/MyStories";
import Contracts from "./Contracts";
import Promote from "./Promote";


function CreatePage() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "mystories":
        return <MyStories />;
      case "contracts":
        return <Contracts />;
      case "promote":
        return <Promote />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="create-page">
      {/* Sidebar */}
      <nav className="sidebar">
        <ul>
          <li onClick={() => setActivePage("dashboard")}>📊 Dashboard</li>
          <li onClick={() => setActivePage("mystories")}>📚 My Stories</li>
          <li onClick={() => setActivePage("contracts")}>📜 Contracts</li>
          <li onClick={() => setActivePage("promote")}>📢 Promote</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default CreatePage;

