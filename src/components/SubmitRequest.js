import React, { useState } from 'react';

const SubmitRequest = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here (e.g., send to server)
    console.log({ lat, lon, time, hours });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Submit Travel Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Latitude:</label>
          <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} required />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="number" value={lon} onChange={(e) => setLon(e.target.value)} required />
        </div>
        <div>
          <label>Departure Time:</label>
          <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div>
          <label>Travel Duration (hours):</label>
          <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitRequest;