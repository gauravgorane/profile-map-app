import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../firebase";
import MapComponent from "../components/MapComponent";

const ProfilePage = () => {
  const { profileId } = useParams(); // Get profileId from URL params
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the profile data from Firebase based on the profileId
    const fetchProfile = async () => {
      try {
        const profileRef = ref(database, `profiles/${profileId}`);
        const snapshot = await get(profileRef);
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        } else {
          console.error("Profile not found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center py-10">Profile not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">{profile.name}</h1>
        <p className="text-gray-600 mb-4">{profile.description}</p>
        <div className="text-gray-700 mb-4">
          <h2 className="text-xl font-semibold mb-2">Contact Information:</h2>
          {/* You can add more fields like email, phone, etc. */}
          <p>
            <strong>Latitude:</strong> {profile.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {profile.lng}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Location Map:</h2>
          <MapComponent position={[profile.lat, profile.lng]} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
