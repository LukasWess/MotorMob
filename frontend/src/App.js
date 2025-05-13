import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DriversPage from './pages/DriversPage';
import DriverProfilePage from './pages/DriverProfilePage';
import RacingSeriesPage from './pages/RacingSeriesPage';
import RacesPage from './pages/RacesPage';
import RaceDetailPage from './pages/RaceDetailPage';
import StandingsPage from './pages/StandingsPage';
import NotFound from './pages/NotFound';
import DevTools from './components/DevTools';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />      <main className="main-content">        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/series" element={<RacingSeriesPage />} />
          <Route path="/series/:seriesId/drivers" element={<DriversPage />} />
          <Route path="/series/:seriesId/races" element={<RacesPage />} />
          <Route path="/series/:seriesId/standings" element={<StandingsPage />} />
          <Route path="/drivers/:id" element={<DriverProfilePage />} />
          <Route path="/races" element={<Navigate to="/series" replace />} />
          <Route path="/races/:id" element={<RaceDetailPage />} />
          <Route path="/standings" element={<Navigate to="/series" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>      </main>
      <Footer />
      {/* Only renders in development */}
      <DevTools />
    </div>
  );
}

export default App;
