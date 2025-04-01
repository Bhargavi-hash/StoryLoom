import React, { useState } from "react";
const languages = [
    "English", "Spanish", "French", "German", "Chinese", "Hindi", "Arabic", "Portuguese", "Russian", "Japanese",
    "Korean", "Italian", "Turkish", "Dutch", "Swedish", "Polish", "Ukrainian", "Hebrew", "Thai", "Vietnamese",
    "Indonesian", "Persian", "Tamil", "Bengali", "Telugu", "Malay", "Marathi", "Urdu", "Greek", "Czech", "Hungarian"
];

function LanguageOptions() {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    return (
        <div className="story-details">
            <label htmlFor="language">Language:</label>
            <select
                id="language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="dropdown"
            >
                <option value="" disabled>Select a language</option>
                {languages.map((lang, index) => (
                    <option key={index} value={lang}>{lang}</option>
                ))}
            </select>
        </div>
    );
}

export default LanguageOptions;