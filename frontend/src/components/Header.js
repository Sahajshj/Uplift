import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

// Animation for button hover
const buttonHover = keyframes`
  0% {
    transform: scale(1);
    background-color: rgba(33, 150, 243, 0.1);
  }
  50% {
    transform: scale(1.05);
    background-color: rgba(33, 150, 243, 0.2);
  }
  100% {
    transform: scale(1);
    background-color: rgba(33, 150, 243, 0.1);
  }
`;

// Styled components
const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(90deg, rgba(33, 150, 243, 1) 0%, rgba(33, 150, 243, 0.7) 100%)',
  color: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
});

const StyledTypography = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 700,
  color: '#fff',
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 16px',
  borderRadius: '8px',
  border: '2px solid transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '2px solid #fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    animation: `${buttonHover} 0.6s ease`,
  },
}));

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <StyledTypography>Uplift</StyledTypography>
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <StyledButton component={Link} to="/">Home</StyledButton>
          <StyledButton component={Link} to="/articles">Articles</StyledButton>
          <StyledButton component={Link} to="/doctors">Doctors</StyledButton>
          <StyledButton component={Link} to="/login">Login</StyledButton>
          <StyledButton component={Link} to="/signup">Signup</StyledButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
