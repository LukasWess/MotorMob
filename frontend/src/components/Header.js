import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <h1>MotorMob</h1>
          </Link>
        </div>        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">              <Link to="/series" className="nav-link">Races</Link>
            </li>
            <li className="nav-item">
              <Link to="/series" className="nav-link">Standings</Link>
            </li>
            <li className="nav-item">
              <Link to="/series" className="nav-link">Drivers</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
