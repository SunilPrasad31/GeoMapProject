import logo from './logo.svg';
import './App.css';
import MapComponent from './components/MapComponent';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SubmitRequest from './components/SubmitRequest';
import WeatherForecast from './components/WeatherForecast';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change this to your desired primary color
    },
    common: {
      white: '#ffffff',
    },
    grey: {
      100: '#f5f5f5',
    },
  },
});
function App() {
  const shipPosition = [20.5937, 78.9629];
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapComponent shipPosition={shipPosition} />} />
        <Route path="/submit" element={<SubmitRequest />} />
        <Route path="/weather" element={<WeatherForecast />} />
      </Routes>
    </Router>
    </ThemeProvider>
    </div>
  );
}

export default App;
