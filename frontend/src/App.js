// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline} from '@mui/material';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <CssBaseline /> {/* Provides consistent baseline styling */}
      
      {/* Navbar */}
      <Header />
      
      <Container sx={{ mt: 4, mb: 4 }}>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
