import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Export par défaut
import Home from './pages/Home'; // Export par défaut
import Reservation from './pages/Reservation'; // Export par défaut
import Cars from './pages/Cars'; // Export par défaut
import About from './pages/About'; // Export par défaut
import Footer from './components/footer';


function App() {
  return (
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
