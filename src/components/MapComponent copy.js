import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import tamilNaduGeoJSON from '../tamilnadu.json'; // Your GeoJSON data for Tamil Nadu

const initialPoints = [
  { lat: 13.0827, lng: 80.2707 }, // Example point in Chennai
];

const isPointInPolygon = (point, vs) => {
  let x = point.lng, y = point.lat;
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let xi = vs[i].lng, yi = vs[i].lat;
    let xj = vs[j].lng, yj = vs[j].lat;
    let intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

const MapComponent = () => {
  const [points, setPoints] = useState(initialPoints);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [inside, setInside] = useState(null);

  const handleAddPoint = (e) => {
    const { lat, lng } = e.latlng;
    setPoints([...points, { lat, lng }]);
  };

  const checkPoint = () => {
    const point = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    const insideBoundary = isPointInPolygon(point, points);
    setInside(insideBoundary);
  };

  return (
    <div>
      <MapContainer
        center={[11.1271, 78.6569]} // Center on Tamil Nadu
        zoom={7}
        style={{ height: "500px", width: "100%" }}
        onClick={handleAddPoint}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point, idx) => (
          <Marker
            key={idx}
            position={point}
          >
            <Popup>{`Lat: ${point.lat}, Lng: ${point.lng}`}</Popup>
          </Marker>
        ))}
        {points.length > 1 && (
          <Polyline positions={points} color="blue" />
        )}
        <GeoJSON data={tamilNaduGeoJSON} />
      </MapContainer>
      <div>
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={checkPoint}>Check Point</button>
        {inside !== null && (
          <p>{inside ? 'Point is inside the boundary' : 'Point is outside the boundary'}</p>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
