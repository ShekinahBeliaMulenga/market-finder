import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';

// Custom user icon (green)
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

// Custom trader icon (red)
const traderIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png',
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

// 🔁 Auto-follow component
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }
  }, [lat, lng, map]);

  return null;
};

const ConsumerMap = ({ traders }) => {
  const mapRef = useRef();
  const [userLocation, setUserLocation] = useState(null);

  // Use geolocation to get the user's position if available
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Set default location if geolocation fails
          setUserLocation({ lat: -12.97, lng: 28.65 });
        }
      );
    } else {
      console.log('Geolocation not available');
      // Set default location if geolocation is not supported
      setUserLocation({ lat: -12.97, lng: 28.65 });
    }
  }, []);

  const handleMarkerClick = (traderPos) => {
    if (mapRef.current) {
      mapRef.current.flyTo(traderPos, 16, { duration: 1.2 });
    }
  };

  // Default center if userLocation is not yet available
  const mapCenter = userLocation ? [userLocation.lat, userLocation.lng] : [-12.97, 28.65];

  return (
    <MapContainer
      center={mapCenter}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: '450px', width: '100%', borderRadius: '12px', border: '2px solid #1976d2' }}
      whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {/* 🧭 Recenter on live location */}
      {userLocation && <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />}

      {/* 🟢 User Marker */}
      {userLocation && (
        <>
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here 📍</Popup>
          </Marker>
          <Tooltip permanent direction="bottom" offset={[0, 15]} position={[userLocation.lat, userLocation.lng]}>
            You
          </Tooltip>
          <Circle center={[userLocation.lat, userLocation.lng]} radius={1000} color="blue" fillOpacity={0.1} />
        </>
      )}

      {/* 🔴 Trader Markers */}
      {traders.map((t, i) => {
        const traderPos = [t.trader.latitude, t.trader.longitude];
        const consumerPos = [userLocation.lat, userLocation.lng];

        return (
          <Marker
            key={i}
            position={traderPos}
            icon={traderIcon}
            eventHandlers={{
              click: () => handleMarkerClick(traderPos)
            }}
          >
            <Popup>
              <div>
                <strong>{t.trader.shopName}</strong><br />
                <small>{t.trader.address}</small><br />
                🛒 <em>{t.product.name}</em> @ <strong>K{t.product.price}</strong><br />
                📦 {t.product.quantity} in stock<br />
                📍 ~{(t.distanceInMeters / 1000).toFixed(2)} km from you
              </div>
            </Popup>
            <Tooltip direction="top" offset={[0, -10]}>{t.trader.shopName}</Tooltip>

            <Polyline
              positions={[consumerPos, traderPos]}
              color="dodgerblue"
              weight={4}
              opacity={0.5}
              dashArray="6"
            />
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ConsumerMap;
