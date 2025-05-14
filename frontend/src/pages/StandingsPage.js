import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motorsportService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/StandingsPage.css';

function StandingsPage() {
  const { seriesId = 'all' } = useParams();
  const navigate = useNavigate();
  
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableSeries, setAvailableSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(seriesId);
  const [standingsType, setStandingsType] = useState('drivers'); // 'drivers' or 'constructors'
  
  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the list of racing series
        const seriesData = await motorsportService.getAllSeries();
        setAvailableSeries(seriesData);
        
        // Get standings data
        const standingsData = await motorsportService.getStandings(selectedSeries);
        setStandings(standingsData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading standings:', err);
        setError('Failed to load standings. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchStandings();
  }, [selectedSeries]);
    const handleSeriesChange = (series) => {
    setSelectedSeries(series);
    // Update URL without reloading the page
    navigate(`/series/${series}/standings`, { replace: true });
  };
  
  // Filter standings by selected series if not 'all'
  const filteredStandings = standings.filter(item => 
    selectedSeries === 'all' || item.series?.toLowerCase() === selectedSeries.toLowerCase()
  );
  
  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="error-container">
      <div className="error-message">
        {error}
      </div>
    </div>
  );
  
  return (
    <div className="standings-page">
      <h1 className="page-title">Championship Standings</h1>
      
      {/* Series selection tabs */}
      <div className="standings-series-tabs">
        <button
          className={selectedSeries === 'all' ? 'active' : ''}
          onClick={() => handleSeriesChange('all')}
        >
          All Series
        </button>
        
        {availableSeries.map(series => (
          <button
            key={series.id}
            className={selectedSeries === series.id ? 'active' : ''}
            onClick={() => handleSeriesChange(series.id)}
          >
            {series.name}
          </button>
        ))}
      </div>
      
      {/* Driver/Constructor standings toggle - for future implementation */}
      <div className="standings-type-tabs">
        <button
          className={standingsType === 'drivers' ? 'active' : ''}
          onClick={() => setStandingsType('drivers')}
        >
          Drivers
        </button>
        <button
          className={standingsType === 'constructors' ? 'active' : ''}
          onClick={() => setStandingsType('constructors')}
          disabled={true} // Enable when constructor standings are available
        >
          Constructors
        </button>
      </div>
      
      {/* Standings table */}
      <div className="standings-table-container">
        <h2 className="standings-title">
          {selectedSeries === 'all' ? 'Drivers Standings' : `${selectedSeries.toUpperCase()} Drivers Standings`}
        </h2>
        
        {filteredStandings.length === 0 ? (
          <p>No standings data available for the selected series.</p>
        ) : (
          <table className="standings-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Nationality</th>
                <th>Points</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {filteredStandings.map((item) => (
                <tr 
                  key={`${item.driver.id}-${item.series}`}
                  className={item.position <= 3 ? 'podium-position' : ''}
                >
                  <td className="position">{item.position}</td>
                  <td className="name">{item.driver.name}</td>
                  <td className="team">{item.team}</td>
                  <td className="nationality">{item.driver.nationality}</td>
                  <td className="points">{item.points}</td>
                  <td className="wins">{item.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StandingsPage;
