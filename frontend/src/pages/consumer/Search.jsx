import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
  Box,
} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import ConsumerMap from './ConsumerMap'; // Import ConsumerMap

const Search = () => {
  const [productName, setProductName] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get user's location in real-time
  useEffect(() => {
    let geoWatchId;
  
    if (navigator.geolocation) {
      geoWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
  
          console.log("Real-time Location Updated: ", newLocation); // Debugging line
          setUserLocation(prev => {
            // Avoid unnecessary updates if the location hasn't changed
            if (!prev || prev.lat !== newLocation.lat || prev.lng !== newLocation.lng) {
              return newLocation;
            }
            return prev;
          });
  
          setError(''); // Reset any errors
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Failed to track location in real-time');
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  
    return () => {
      if (geoWatchId) {
        navigator.geolocation.clearWatch(geoWatchId);
      }
    };
  }, []);

  const handleManualLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        console.log("Manual Location Updated: ", newLocation); // Debugging line
        setUserLocation(newLocation);
        setError(''); // Reset any errors
      },
      (err) => {
        console.error(err);
        setError('Failed to get location manually');
      }
    );
  };
  
  const handleSearch = async () => {
    if (!productName.trim()) {
      setError('Please enter a product name.');
      return;
    }

    if (!userLocation) {
      setError('Please allow location access first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/search', {
        productName,
        userLatitude: userLocation.lat,
        userLongitude: userLocation.lng,
      });

      setResults(res.data);
    } catch (err) {
      setError('Product not found or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Market Finder</Typography>
      <Typography variant="body1" gutterBottom color="textSecondary">
        Find the nearest shop with your desired product.
      </Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid xs={12} sm={6}>
          <TextField
            label="Search for a product"
            variant="outlined"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Grid>
        <Grid xs={6} sm={3}>
          <Button
            variant="contained"
            onClick={handleManualLocation}
            fullWidth
            startIcon={<RoomIcon />}
          >
            Use My Location
          </Button>
        </Grid>
        <Grid xs={6} sm={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Grid>
      </Grid>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {userLocation && (
        <Box sx={{ mb: 3 }}>
          {/* Use ConsumerMap here */}
          <ConsumerMap userLocation={userLocation} traders={results} />
        </Box>
      )}

      {results.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            {results.length} result(s) found
          </Typography>

          <Grid container spacing={2}>
            {results.map((result, idx) => (
              <Grid xs={12} sm={6} key={idx}>
                <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{result.trader.shopName}</Typography>
                    <Typography color="textSecondary">{result.trader.address}</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
                      <ShoppingCartIcon fontSize="small" /> {result.product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'green' }}>
                      K{result.product.price} ({result.product.quantity} in stock)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="caption" color="textSecondary" sx={{ mr: 1 }}>
                        ~{(result.distanceInMeters / 1000).toFixed(2)} km away
                      </Typography>
                      <IconButton size="small" color="primary" title="More info">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Search;
