// src/components/common/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/global.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/settings">Settings</Link>
          </li>
          <li className="nav-item">
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
