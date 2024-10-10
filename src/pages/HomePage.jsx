import React, { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase";
import ProfileCard from "../components/ProfileCard";
import MapComponent from "../components/MapComponent";

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const profilesRef = ref(database, "profiles/");
    onValue(profilesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const profilesArray = Object.entries(data).map(([id, profile]) => ({
          ...profile,
          id, // Add the profile ID to each profile object
        }));

        setProfiles(profilesArray);
      }
    });
  }, []);

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSummaryClick={handleSummaryClick}
          />
        ))}
      </div>
      {selectedProfile && (
        <MapComponent position={[selectedProfile.lat, selectedProfile.lng]} />
      )}
    </div>
  );
};

export default HomePage;
