import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import AddCoordinateDisplay from '../AddCoordinateDisplay';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

// Custom marker icons
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent = () => {
  const [coords, setCoords] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleMouseMove = (e) => {
    const lat = e.latlng.lat.toFixed(4);
    const lng = e.latlng.lng.toFixed(4);
    setCoords({ lat, lng });
    setLat(lat);
    setLng(lng);
  };

  const indiaSeaBorderCoordinates = [
    { lat: 8.086, lng: 77.650 },  // Kanyakumari (Southern tip)
    { lat: 8.100, lng: 78.800 },  // Gulf of Mannar
    { lat: 9.000, lng: 79.000 },  // Near Dhanushkodi
    { lat: 10.000, lng: 79.500 }, // Near Pamban Island
    { lat: 10.500, lng: 79.800 }, // Near Tamil Nadu coast
    { lat: 11.000, lng: 80.300 }, // Near Chennai
    { lat: 12.700, lng: 80.300 }, // Chennai
    { lat: 12.800, lng: 80.400 }, // Chennai coast
    { lat: 13.200, lng: 80.600 }, // Andhra Pradesh coast
    { lat: 13.700, lng: 81.300 }, // Odisha coast
    { lat: 14.500, lng: 83.900 }, // West Bengal coast
    { lat: 21.000, lng: 87.100 }, // Near Sundarbans
    { lat: 22.000, lng: 88.500 }, // Kolkata
    { lat: 22.500, lng: 88.300 }, // Near Bangladesh
    { lat: 23.000, lng: 89.000 }, // Border with Bangladesh
    { lat: 23.500, lng: 89.500 }, // Near Tripura
    { lat: 24.000, lng: 91.100 }, // Near Assam
    { lat: 25.000, lng: 92.100 }, // North East coast
    { lat: 26.000, lng: 93.100 }, // North East coast
    { lat: 26.500, lng: 95.000 }, // Near Arunachal Pradesh
    { lat: 27.000, lng: 96.000 }, // North East coast
    { lat: 28.000, lng: 97.000 }, // Border with China (NE)
    { lat: 28.500, lng: 97.500 }, // Northern border
    { lat: 29.000, lng: 78.500 }, // Near Uttarakhand
    { lat: 20.000, lng: 68.000 }, // Arabian Sea coast
    { lat: 19.000, lng: 67.500 }, // Arabian Sea coast
    { lat: 18.000, lng: 68.000 }, // Near Maharashtra
    { lat: 17.500, lng: 72.000 }, // Mumbai coast
    { lat: 17.000, lng: 72.500 }, // Arabian Sea
    { lat: 16.000, lng: 73.000 }, // Goa
    { lat: 15.000, lng: 74.000 }, // Coastal Karnataka
    { lat: 14.000, lng: 75.000 }, // Coastal Maharashtra
    { lat: 13.000, lng: 76.000 }, // Near Diu
    { lat: 12.000, lng: 77.000 }, // Close to Gujarat
    { lat: 11.500, lng: 73.000 }, // Near Lakshadweep Islands
    { lat: 8.000, lng: 77.000 },  // Return to southern tip
    { lat: 8.400, lng: 77.600 },  // Near Cape Comorin
    { lat: 9.000, lng: 78.400 },  // Off the coast of Tamil Nadu
    { lat: 10.000, lng: 78.900 }, // Near Dhanushkodi
    { lat: 11.200, lng: 79.800 }, // Near Chennai coast
    { lat: 12.800, lng: 81.200 }, // Near Andaman and Nicobar Islands
  ];
  const addMarker = () => {
    if (lat && lng) {
      const markerLat = parseFloat(lat);
      const markerLng = parseFloat(lng);
      const isInside = isInsidePolygon(markerLat, markerLng);

      const markerData = {
        lat: markerLat,
        lng: markerLng,
        icon: isInside ? greenIcon : redIcon,
        message: isInside ? 'Inside Border' : 'Outside Border'
      };

      setMarkers([...markers, markerData]);
      setLat('');
      setLng('');
    }
  };

  const isLocationInsideIndiaSea = (latitude, longitude) => {
    let inside = false;
    const n = indiaSeaBorderCoordinates.length;

    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = indiaSeaBorderCoordinates[i].lng;
      const yi = indiaSeaBorderCoordinates[i].lat;
      const xj = indiaSeaBorderCoordinates[j].lng;
      const yj = indiaSeaBorderCoordinates[j].lat;

      const intersect = ((yi > latitude) !== (yj > latitude)) &&
        (longitude < (xj - xi) * (latitude - yi) / (yj - yi) + xi);
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  };

  const isInsidePolygon = (lat, lng) => {
    return isLocationInsideIndiaSea(lat, lng);
  };
  const handleMapDoubleClick = (e) => {
    const lat = e.latlng.lat.toFixed(4);
    const lng = e.latlng.lng.toFixed(4);

    setLat(lat);
    setLng(lng);
    addMarker(lat, lng); // Call addMarker with the coordinates
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        height: '100vh',
        background: 'black',
        padding: 1
      }}
    >
      <Paper sx={{ width: '250px', marginRight: 2 }} elevation={3}>
        <Typography variant="h6">Add Marker</Typography>
        <TextField
          label="Latitude"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <TextField
          label="Longitude"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addMarker} fullWidth>
          Add Marker
        </Button>
        {coords && (
          <Box sx={{ marginTop: 2 }}>
            <Typography>Hovering at:</Typography>
            <Typography>Latitude: {coords.lat}, Longitude: {coords.lng}</Typography>
          </Box>
        )}
      </Paper>

      <MapContainer
        center={[11.1271, 78.6569]} // Center of Tamil Nadu
        zoom={6}
        style={{ height: '550px', width: '100%' }}
        onmousemove={handleMouseMove}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <AddCoordinateDisplay setCoords={setCoords} />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]} icon={marker.icon}>
            <Tooltip permanent>
              Latitude: {marker.lat}, Longitude: {marker.lng} - {marker.message}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapComponent;