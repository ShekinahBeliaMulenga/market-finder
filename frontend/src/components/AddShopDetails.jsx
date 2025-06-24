import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -15.3875, // Lusaka default
  lng: 28.3228,
};

const AddShopDetails = () => {
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState(null);
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      setAddress(place.formatted_address);
      setPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      shopName,
      address,
      latitude: position.lat,
      longitude: position.lng,
      userId: 1, // Replace with actual logged-in user's ID
    };

    try {
      const res = await fetch('/api/trader/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert('Saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving details');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Trader Shop Setup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
        />
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
          <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceChanged}>
            <input
              type="text"
              placeholder="Search for your location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position || center}
            zoom={position ? 15 : 12}
          >
            {position && <Marker position={position} />}
          </GoogleMap>
        </LoadScript>
        <button type="submit">Save Shop Details</button>
      </form>
    </div>
  );
};

export default AddShopDetails;
