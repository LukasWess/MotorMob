import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/StandingsPage.css';

function StandingsPage() {
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState({});
  const [activeSeries, setActiveSeries] = useState('formula1');
  const [activeTab, setActiveTab] = useState('drivers');
  
  // Sample standings data - would normally come from an API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
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
        wec: {
          drivers: [
            { position: 1, driver: 'Sébastien Buemi', team: 'Toyota Gazoo Racing', points: 105, nationality: 'Switzerland', wins: 2 },
            { position: 2, driver: 'Brendon Hartley', team: 'Toyota Gazoo Racing', points: 105, nationality: 'New Zealand', wins: 2 },
            { position: 3, driver: 'Kévin Estre', team: 'Porsche Penske Motorsport', points: 88, nationality: 'France', wins: 1 }
          ],
          teams: [
            { position: 1, team: 'Toyota Gazoo Racing', points: 105, wins: 2 },
            { position: 2, team: 'Porsche Penske Motorsport', points: 88, wins: 1 },
            { position: 3, team: 'Ferrari AF Corse', points: 76, wins: 0 }
          ]
        }
      });
      setLoading(false);
    }, 1000);
  }, []);
  
  const getActiveStandings = () => {
    if (!standings[activeSeries]) {
      return [];
    }
    return activeTab === 'drivers' ? standings[activeSeries].drivers : standings[activeSeries].teams;
  };
  
  const getSeriesName = (code) => {
    const seriesMap = {
      formula1: 'Formula 1',
      indycar: 'IndyCar',
      wec: 'World Endurance Championship'
    };
    return seriesMap[code] || code;
  };
  
  return (
    <div className="standings-page">
      <div className="page-header">
        <h1>Championship Standings</h1>
        
        <div className="standings-series-tabs">
          <button 
            className={`series-tab ${activeSeries === 'formula1' ? 'active' : ''}`}
            onClick={() => setActiveSeries('formula1')}
          >
            Formula 1
          </button>
          <button 
            className={`series-tab ${activeSeries === 'indycar' ? 'active' : ''}`}
            onClick={() => setActiveSeries('indycar')}
          >
            IndyCar
          </button>
          <button 
            className={`series-tab ${activeSeries === 'wec' ? 'active' : ''}`}
            onClick={() => setActiveSeries('wec')}
          >
            WEC
          </button>
        </div>
        
        <div className="standings-type-tabs">
          <button 
            className={`tab-btn ${activeTab === 'drivers' ? 'active' : ''}`}
            onClick={() => setActiveTab('drivers')}
          >
            Drivers
          </button>
          <button 
            className={`tab-btn ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            Teams
          </button>
        </div>
      </div>
      
      {loading ? (
        <LoadingSpinner message={`Loading ${getSeriesName(activeSeries)} standings...`} />
      ) : (
        <div className="standings-table-container">
          <h2 className="standings-title">
            {getSeriesName(activeSeries)} {activeTab === 'drivers' ? 'Drivers' : 'Constructors'} Championship
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
