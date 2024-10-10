import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ position }) => {
  return (
    <MapContainer center={position} zoom={13} className="h-96 w-full mt-4">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>Selected Profile Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
