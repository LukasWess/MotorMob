import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { motorsportService } from '../services/api.js';
import { images } from '../assets/images';
import '../styles/RaceDetailPage.css';

function RaceDetailPage() {
  const { id } = useParams();
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaceDetails = async () => {
      try {
        setLoading(true);
        // Try to get data from API first
        try {
          const data = await motorsportService.getRaceDetails(id);
          setRace(data);
          setLoading(false);
          return;
        } catch (apiError) {
          console.log('API not available, using mock data', apiError);
          // If API fails, fall back to mock data
        }

        // Mock data as fallback
        setTimeout(() => {
          const mockRaces = {
            "1": {
              id: 1,
              name: "Monaco Grand Prix",
              circuit: "Circuit de Monaco",
              location: "Monte Carlo, Monaco",
              date: "May 25, 2025",
              time: "14:00",
              status: "upcoming",
              series: "Formula 1",
              circuitLength: "3.337 km",
              laps: 78,
              distance: "260.286 km",
              lapRecord: {
                time: "1:12.909",
                driver: "Lewis Hamilton",
                year: 2021
              },
              circuitImage: images.circuits.monaco,
              description: "The Monaco Grand Prix is a Formula One motor race held annually on the Circuit de Monaco on the last weekend in May. Run since 1929, it is widely considered to be one of the most important and prestigious automobile races in the world, alongside the Indianapolis 500 and the 24 Hours of Le Mans.",
              previousWinners: [
                { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
                { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
                { year: 2022, driver: "Sergio Perez", team: "Red Bull Racing" },
                { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
                { year: 2019, driver: "Lewis Hamilton", team: "Mercedes" }
              ],
              trackLayout: images.circuits.monaco,
              weatherForecast: {
                conditions: "Sunny",
                temperature: "22°C",
                precipitation: "0%",
                windSpeed: "5 km/h"
              }
            },
            "2": {
              id: 2,
              name: "Indianapolis 500",
              circuit: "Indianapolis Motor Speedway",
              location: "Indianapolis, USA",
              date: "May 26, 2025",
              time: "12:00",
              status: "upcoming",
              series: "IndyCar",
              circuitLength: "2.5 miles",
              laps: 200,
              distance: "500 miles",
              lapRecord: {
                time: "37.895 seconds",
                driver: "Scott Dixon",
                year: 2022
              },
              circuitImage: images.circuits.indianapolis,
              description: "The Indianapolis 500 is an automobile race held annually at Indianapolis Motor Speedway in Speedway, Indiana, United States, an enclave suburb of Indianapolis. The event is traditionally held over Memorial Day weekend in late May. It is contested as part of the IndyCar Series, the top level of American championship car racing.",
              previousWinners: [
                { year: 2024, driver: "Scott Dixon", team: "Chip Ganassi Racing" },
                { year: 2023, driver: "Josef Newgarden", team: "Team Penske" },
                { year: 2022, driver: "Marcus Ericsson", team: "Chip Ganassi Racing" },
                { year: 2021, driver: "Helio Castroneves", team: "Meyer Shank Racing" },
                { year: 2020, driver: "Takuma Sato", team: "Rahal Letterman Lanigan Racing" }
              ],
              trackLayout: images.circuits.indianapolis,
              weatherForecast: {
                conditions: "Partly Cloudy",
                temperature: "25°C",
                precipitation: "10%",
                windSpeed: "8 km/h"
              }
            }
          };

          if (mockRaces[id]) {
            setRace(mockRaces[id]);
            setLoading(false);
          } else {
            setError("Race not found");
            setLoading(false);
          }
        }, 800); // Simulate loading delay
      } catch (error) {
        setError("Failed to load race details");
        setLoading(false);
      }
    };

    fetchRaceDetails();
  }, [id]);

  if (loading) {
    return <div className="race-detail-page loading-container"><LoadingSpinner /></div>;
  }

  if (error) {
    return (
      <div className="race-detail-page error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/races" className="btn btn-primary">Back to Races</Link>
      </div>
    );
  }

  return (
    <div className="race-detail-page">
      <div className="race-header">
        <div className="race-header-content">
          <div className="back-button-container">
            <Link to="/races" className="back-button">
              <i className="fas fa-arrow-left"></i> Back to Races
            </Link>
          </div>
          <div 
            className="circuit-image" 
            style={{ backgroundImage: `url(${race.circuitImage})` }}
          >
            <div className="race-series-badge">{race.series}</div>
          </div>
          <div className="race-basic-info">
            <h1 className="race-name">{race.name}</h1>
            <div className="race-circuit">{race.circuit}</div>
            <div className="race-date-time">
              <span className="race-date">{race.date}</span> • <span className="race-time">{race.time}</span>
            </div>
            <div className="race-location">{race.location}</div>
            <div className="race-status-badge">{race.status}</div>
          </div>
        </div>
      </div>

      <div className="race-content">
        <div className="race-details">
          <div className="circuit-info-section">
            <h2>Circuit Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Circuit Length</div>
                <div className="info-value">{race.circuitLength}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Race Distance</div>
                <div className="info-value">{race.distance}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Number of Laps</div>
                <div className="info-value">{race.laps}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Lap Record</div>
                <div className="info-value">
                  {race.lapRecord.time} ({race.lapRecord.driver}, {race.lapRecord.year})
                </div>
              </div>
            </div>
          </div>
          
          <div className="race-description">
            <h2>About the Race</h2>
            <p>{race.description}</p>
          </div>

          <div className="previous-winners">
            <h2>Previous Winners</h2>
            <table className="winners-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Driver</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {race.previousWinners.map((winner, index) => (
                  <tr key={index}>
                    <td>{winner.year}</td>
                    <td>{winner.driver}</td>
                    <td>{winner.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="weather-forecast">
            <h2>Weather Forecast</h2>
            <div className="weather-card">
              <div className="weather-condition">{race.weatherForecast.conditions}</div>
              <div className="weather-details">
                <div className="weather-item">
                  <span className="weather-label">Temperature:</span>
                  <span className="weather-value">{race.weatherForecast.temperature}</span>
                </div>
                <div className="weather-item">
                  <span className="weather-label">Precipitation:</span>
                  <span className="weather-value">{race.weatherForecast.precipitation}</span>
                </div>
                <div className="weather-item">
                  <span className="weather-label">Wind:</span>
                  <span className="weather-value">{race.weatherForecast.windSpeed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="track-layout-container">
          <h2>Track Layout</h2>
          <div className="track-layout-image" style={{ backgroundImage: `url(${race.trackLayout})` }}></div>
        </div>
      </div>
    </div>
  );
}

export default RaceDetailPage;
