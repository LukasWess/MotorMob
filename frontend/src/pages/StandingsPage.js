import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockRacingSeries } from '../data/mockData';
import '../styles/StandingsPage.css';

function StandingsPage() {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState({});
  const [series, setSeries] = useState(null);
  const [activeTab, setActiveTab] = useState('drivers');
  const [error, setError] = useState(null);
  
  // Fetch standings data when component mounts
  useEffect(() => {
    // Find the series information
    const currentSeries = mockRacingSeries.find(s => s.id === parseInt(seriesId));
    if (!currentSeries) {
      setError('Racing series not found');
      setLoading(false);
      return;
    }
    
    setSeries(currentSeries);
    
    // Simulating API call
    setTimeout(() => {
      // The mapping of our series IDs to the standings data keys
      const seriesMapping = {
        1: 'formula1',   // F1
        2: 'indycar',    // IndyCar
        3: 'nascar',     // NASCAR (new)
        4: 'formula_e'   // Formula E (new)
      };
      
      const seriesKey = seriesMapping[seriesId] || 'formula1';
      
      setStandings({
        formula1: {
          drivers: [
            { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 125, nationality: 'Netherlands', wins: 3 },
            { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes', points: 110, nationality: 'United Kingdom', wins: 2 },
            { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', points: 98, nationality: 'Monaco', wins: 1 },
            { position: 4, driver: 'Lando Norris', team: 'McLaren', points: 89, nationality: 'United Kingdom', wins: 0 },
            { position: 5, driver: 'George Russell', team: 'Mercedes', points: 82, nationality: 'United Kingdom', wins: 0 },
            { position: 6, driver: 'Carlos Sainz', team: 'Ferrari', points: 75, nationality: 'Spain', wins: 0 },
            { position: 7, driver: 'Fernando Alonso', team: 'Aston Martin', points: 57, nationality: 'Spain', wins: 0 },
            { position: 8, driver: 'Sergio Perez', team: 'Red Bull Racing', points: 48, nationality: 'Mexico', wins: 0 },
            { position: 9, driver: 'Oscar Piastri', team: 'McLaren', points: 40, nationality: 'Australia', wins: 0 },
            { position: 10, driver: 'Lance Stroll', team: 'Aston Martin', points: 15, nationality: 'Canada', wins: 0 }
          ],
          teams: [
            { position: 1, team: 'Red Bull Racing', points: 173, wins: 3 },
            { position: 2, team: 'Mercedes', points: 192, wins: 2 },
            { position: 3, team: 'Ferrari', points: 173, wins: 1 },
            { position: 4, team: 'McLaren', points: 129, wins: 0 },
            { position: 5, team: 'Aston Martin', points: 72, wins: 0 }
          ]
        },
        indycar: {
          drivers: [
            { position: 1, driver: 'Scott Dixon', team: 'Chip Ganassi Racing', points: 95, nationality: 'New Zealand', wins: 1 },
            { position: 2, driver: 'Alex Palou', team: 'Chip Ganassi Racing', points: 92, nationality: 'Spain', wins: 1 },
            { position: 3, driver: 'Josef Newgarden', team: 'Team Penske', points: 88, nationality: 'United States', wins: 1 },
            { position: 4, driver: 'Colton Herta', team: 'Andretti Autosport', points: 80, nationality: 'United States', wins: 0 },
            { position: 5, driver: 'Will Power', team: 'Team Penske', points: 76, nationality: 'Australia', wins: 0 }
          ],
          teams: [
            { position: 1, team: 'Chip Ganassi Racing', points: 187, wins: 2 },
            { position: 2, team: 'Team Penske', points: 164, wins: 1 },
            { position: 3, team: 'Andretti Autosport', points: 140, wins: 0 }
          ]
        },
        nascar: {
          drivers: [
            { position: 1, driver: 'Kyle Larson', team: 'Hendrick Motorsports', points: 110, nationality: 'United States', wins: 2 },
            { position: 2, driver: 'Denny Hamlin', team: 'Joe Gibbs Racing', points: 105, nationality: 'United States', wins: 2 },
            { position: 3, driver: 'Chase Elliott', team: 'Hendrick Motorsports', points: 98, nationality: 'United States', wins: 1 }
          ],
          teams: [
            { position: 1, team: 'Hendrick Motorsports', points: 208, wins: 3 },
            { position: 2, team: 'Joe Gibbs Racing', points: 175, wins: 2 }
          ]
        },
        formula_e: {
          drivers: [
            { position: 1, driver: 'Jean-Éric Vergne', team: 'DS Penske', points: 88, nationality: 'France', wins: 1 },
            { position: 2, driver: 'Nick Cassidy', team: 'Jaguar TCS Racing', points: 86, nationality: 'New Zealand', wins: 1 },
            { position: 3, driver: 'Mitch Evans', team: 'Jaguar TCS Racing', points: 80, nationality: 'New Zealand', wins: 1 }
          ],
          teams: [
            { position: 1, team: 'Jaguar TCS Racing', points: 166, wins: 2 },
            { position: 2, team: 'DS Penske', points: 110, wins: 1 }
          ]
        }
      });
      setLoading(false);
    }, 1000);  }, [seriesId]);
  
  const getActiveStandings = () => {
    // Mapping from seriesId to keys in our standings object
    const seriesMapping = {
      1: 'formula1',   // F1
      2: 'indycar',    // IndyCar
      3: 'nascar',     // NASCAR
      4: 'formula_e'   // Formula E
    };
    
    const seriesKey = seriesMapping[seriesId] || 'formula1';
    
    if (!standings[seriesKey]) {
      return [];
    }
    return activeTab === 'drivers' ? standings[seriesKey].drivers : standings[seriesKey].teams;
  };
  return (
    <div className="standings-page">
      <div className="page-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/series')}
            title="Back to series selection"
          >
            <i className="fas fa-arrow-left"></i> Back to Series
          </button>
        </div>
        <h1>{series ? `${series.name} Standings` : 'Standings'}</h1>
        <div className="standings-type-tabs">
          <button 
            className={`type-tab ${activeTab === 'drivers' ? 'active' : ''}`}
            onClick={() => setActiveTab('drivers')}
          >
            Drivers
          </button>
          <button 
            className={`type-tab ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            Teams
          </button>
        </div>      </div>
      
      {loading ? (
        <LoadingSpinner message="Loading standings..." />
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <div className="standings-table-container">
          <h2 className="standings-title">
            {series ? series.name : ''} {activeTab === 'drivers' ? 'Drivers' : 'Constructors'} Championship
          </h2>
          
          <table className="standings-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>{activeTab === 'drivers' ? 'Driver' : 'Team'}</th>
                {activeTab === 'drivers' && <th>Team</th>}
                {activeTab === 'drivers' && <th>Nationality</th>}
                <th>Points</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {getActiveStandings().map((item, index) => (
                <tr key={index} className={index < 3 ? 'podium-position' : ''}>
                  <td className="position">{item.position}</td>
                  <td className="name">
                    {activeTab === 'drivers' ? item.driver : item.team}
                  </td>
                  {activeTab === 'drivers' && <td className="team">{item.team}</td>}
                  {activeTab === 'drivers' && <td className="nationality">{item.nationality}</td>}
                  <td className="points">{item.points}</td>
                  <td className="wins">{item.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StandingsPage;
