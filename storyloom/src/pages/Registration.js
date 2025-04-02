import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    profilePic: "",
    country: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("User registered successfully!");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="text" name="profilePic" placeholder="Profile Picture URL" onChange={handleChange} />
        <input type="text" name="country" placeholder="Country" onChange={handleChange} />
        <textarea name="bio" placeholder="Short Bio" maxLength="100" onChange={handleChange}></textarea>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
