import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Swords, History } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-main-header">
      <div className="logo-section">
        <h1 className="header-title">DEADLOCK PROTOCOL</h1>
      </div>
      
      <nav className="main-nav">
        <NavLink 
            to="/main" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
        >
            <Shield size={18} />
            <span>Hero Randomizer</span>
        </NavLink>
        
        <NavLink 
            to="/draft" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
            <Swords size={18} />
            <span>Captain's Draft</span>
        </NavLink>
        
        <NavLink 
            to="/history" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
            <History size={18} />
            <span>Match History</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
