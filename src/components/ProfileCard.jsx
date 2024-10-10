import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileCard = ({ profile, onSummaryClick }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleButtonClick = () => {
    onSummaryClick(profile); // Call the function to handle additional actions
    navigate(`/profile/${profile.id}`); // Programmatically navigate to the profile page
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <Link to={`/profile/${profile.id}`}>
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-32 object-cover rounded-md"
        />
        <h2 className="text-xl font-bold mt-2">{profile.name}</h2>
      </Link>
      <p className="text-gray-600">{profile.description}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={handleButtonClick} // Use the new function for button click
      >
        Summary
      </button>
    </div>
  );
};

export default ProfileCard;
