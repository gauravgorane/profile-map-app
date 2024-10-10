import React, { useState, useEffect } from "react";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { database } from "../firebase";

const AdminPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "",
    photo: "",
    description: "",
    lat: "",
    lng: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch profiles from Firebase
  useEffect(() => {
    const profilesRef = ref(database, "profiles/");
    onValue(profilesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfiles(
          Object.entries(data).map(([id, profile]) => ({ id, ...profile }))
        );
      } else {
        setProfiles([]);
      }
    });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for adding or updating a profile
  const handleSubmit = (e) => {
    e.preventDefault();
    const profilesRef = ref(database, "profiles/");

    if (isEditing) {
      // Update existing profile
      update(ref(database, `profiles/${editingId}`), profileData);
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Add new profile
      const newProfileRef = push(profilesRef);
      set(newProfileRef, profileData);
    }

    setProfileData({ name: "", photo: "", description: "", lat: "", lng: "" });
  };

  // Handle editing a profile
  const handleEdit = (profile) => {
    setIsEditing(true);
    setEditingId(profile.id);
    setProfileData({
      name: profile.name,
      photo: profile.photo,
      description: profile.description,
      lat: profile.lat,
      lng: profile.lng,
    });
  };

  // Handle deleting a profile
  const handleDelete = (id) => {
    remove(ref(database, `profiles/${id}`));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg mb-6"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Profile" : "Add Profile"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Photo URL:</label>
          <input
            type="text"
            name="photo"
            value={profileData.photo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={profileData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Latitude:</label>
          <input
            type="number"
            name="lat"
            value={profileData.lat}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Longitude:</label>
          <input
            type="number"
            name="lng"
            value={profileData.lng}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Update Profile" : "Add Profile"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Existing Profiles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white p-4 shadow-md rounded-lg">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="text-xl font-bold mt-2">{profile.name}</h3>
            <p className="text-gray-600">{profile.description}</p>
            <p className="text-gray-600">
              Lat: {profile.lat}, Lng: {profile.lng}
            </p>
            <div className="mt-4">
              <button
                className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded"
                onClick={() => handleEdit(profile)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(profile.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
