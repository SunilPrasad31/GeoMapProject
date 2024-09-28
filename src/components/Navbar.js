// NavBar.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import SubmitIcon from '@mui/icons-material/Assignment';
import WeatherIcon from '@mui/icons-material/Cloud';
import { IconButton } from '@mui/material';

const NavBar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <Typography variant="h6" color="white">
            Ship Tracking System
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button component={Link} to="/" color="inherit" startIcon={<HomeIcon />}>
            Home
          </Button>
          <Button component={Link} to="/map" color="inherit" startIcon={<MapIcon />}>
            Map
          </Button>
          <Button component={Link} to="/submit" color="inherit" startIcon={<SubmitIcon />}>
            Submit Request
          </Button>
          <Button component={Link} to="/weather" color="inherit" startIcon={<WeatherIcon />}>
            Weather Forecast
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '10px' }} // Adjust for AppBar height
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default NavBar;
