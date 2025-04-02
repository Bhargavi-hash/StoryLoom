import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching user:", username);
        const response = await fetch(`http://localhost:5000/api/auth/profile/${username}`);
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();
        console.log("Fetched user data:", data);

        setUser(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.bio}</p>
      <p>Country: {user.country}</p>
      {/* <img src={user.profilePic} alt="Profile" /> */}
    </div>
  );
}

export default Profile;
