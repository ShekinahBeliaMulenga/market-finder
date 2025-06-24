import React, { useState} from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '8px',
};

const center = {
  lat: -12.8153,
  lng: 28.2132,
};

const TraderProfileForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    shopName: '',
    address: '',
    latitude: center.lat,
    longitude: center.lng,
  });

  const [markerPosition, setMarkerPosition] = useState(center);

  // 🔄 Reverse geocode using OpenStreetMap (Nominatim)
  const fetchAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const address = data.display_name || '';
      setFormData((prev) => ({ ...prev, address }));
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  };

  // 🧭 When marker is moved or map clicked
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition({ lat, lng });
        setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
        fetchAddressFromCoords(lat, lng);
      },
    });
    return null;
  };

  const handleMarkerDrag = (e) => {
    const lat = e.target.getLatLng().lat;
    const lng = e.target.getLatLng().lng;
    setMarkerPosition({ lat, lng });
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
    fetchAddressFromCoords(lat, lng);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/trader/create-profile', formData);
      alert('Profile created successfully!');
    } catch (error) {
      console.error('Error creating profile:', error.message);
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      p={4}
      maxWidth={600}
      mx="auto"
      mt={5}
      borderRadius={3}
    >
      <Typography variant="h5" gutterBottom>
        Create Trader Profile
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          name="userId"
          label="User ID"
          value={formData.userId}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="shopName"
          label="Shop Name"
          value={formData.shopName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
        />

        <MapContainer
          center={markerPosition}
          zoom={15}
          scrollWheelZoom={true}
          style={containerStyle}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={markerPosition}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDrag,
            }}
          >
            <Popup>Drag me or click map to set location</Popup>
          </Marker>
          <LocationMarker />
        </MapContainer>

        <TextField
          label="Latitude"
          value={formData.latitude}
          name="latitude"
          fullWidth
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Longitude"
          value={formData.longitude}
          name="longitude"
          fullWidth
          InputProps={{ readOnly: true }}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default TraderProfileForm;
