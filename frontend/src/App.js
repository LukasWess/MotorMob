import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DriversPage from './pages/DriversPage';
import DriverProfilePage from './pages/DriverProfilePage';
import RacesPage from './pages/RacesPage';
import RaceDetailPage from './pages/RaceDetailPage';
import StandingsPage from './pages/StandingsPage';
import NotFound from './pages/NotFound';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />      <main className="main-content">        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/drivers/:id" element={<DriverProfilePage />} />
          <Route path="/races" element={<RacesPage />} />
          <Route path="/races/:id" element={<RaceDetailPage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
