import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const AddCoordinateDisplay = ({ setCoords }) => {
  const map = useMap();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const lat = e.latlng.lat.toFixed(4);
      const lng = e.latlng.lng.toFixed(4);
      setCoords({ lat, lng });
    };

    // Add event listener for mouse move
    map.on('mousemove', handleMouseMove);

    // Cleanup on unmount
    return () => {
      map.off('mousemove', handleMouseMove);
    };
  }, [map, setCoords]);

  return null; // This component doesn't render anything itself
};

export default AddCoordinateDisplay;
