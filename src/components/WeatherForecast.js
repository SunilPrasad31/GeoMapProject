// Weather.js
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

// Sample weather data
const sampleWeatherData = {
  location: "Chennai, India",
  temperature: "30°C",
  condition: "Sunny",
  humidity: "65%",
  windSpeed: "10 km/h",
  icon: "☀️", // Use emoji for weather icons
  forecast: [
    { day: "Mon", temp: "29°C", condition: "Partly Cloudy", icon: "🌤️" },
    { day: "Tue", temp: "31°C", condition: "Sunny", icon: "☀️" },
    { day: "Wed", temp: "28°C", condition: "Rainy", icon: "🌧️" },
    { day: "Thu", temp: "30°C", condition: "Cloudy", icon: "☁️" },
    { day: "Fri", temp: "32°C", condition: "Sunny", icon: "☀️" },
  ],
};

// Styled components
const WeatherCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'blue',
  color: theme.palette.common.white,
  textAlign: 'center',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ForecastCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: '10px',
  backgroundColor: 'lightblue',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const WeatherForecast = () => {
  return (
    <Box sx={{ padding: 3, background: 'black', minHeight: '100vh' }}>
      <Typography variant="h4" color="white" align="center" gutterBottom>
        Current Weather
      </Typography>
      
      <motion.div whileHover={{ scale: 1.05 }}>
        <WeatherCard>
          <CardContent>
            <Typography variant="h5">{sampleWeatherData.location}</Typography>
            <Typography variant="h1">{sampleWeatherData.icon} {sampleWeatherData.temperature}</Typography>
            <Typography variant="h6">{sampleWeatherData.condition}</Typography>
            <Typography variant="body1">Humidity: {sampleWeatherData.humidity}</Typography>
            <Typography variant="body1">Wind Speed: {sampleWeatherData.windSpeed}</Typography>
          </CardContent>
        </WeatherCard>
      </motion.div>

      <Typography variant="h5" color="white" align="center" sx={{ marginTop: 4 }}>
        5-Day Forecast
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        {sampleWeatherData.forecast.map((day, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <ForecastCard>
                <CardContent>
                  <Typography variant="h6">{day.day}</Typography>
                  <Typography variant="h4">{day.icon}</Typography>
                  <Typography variant="body1">{day.temp}</Typography>
                  <Typography variant="body2">{day.condition}</Typography>
                </CardContent>
              </ForecastCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </Box>
  );
};

export default WeatherForecast;
