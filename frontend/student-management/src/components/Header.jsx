import React, { useState } from 'react';
import '../styles/Header.css';

export default function Header({ totalStudents = 0, onNavigate = () => {}, currentPage = 'home', darkMode = false, onToggleDarkMode = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavClick = (page) => {
    onNavigate(page);
    closeMenu();
  };

  const isActive = (page) => currentPage === page;

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={() => handleNavClick('home')}>
          <div className="logo-icon">📚</div>
          <div className="logo-text">
            <h2>StudentHub</h2>
            <span>Management System</span>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <a 
            className={`nav-link ${isActive('home') ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            🏠 Home
          </a>
          <a 
            className={`nav-link ${isActive('students') ? 'active' : ''}`}
            onClick={() => handleNavClick('students')}
          >
            👥 Students
          </a>
          <a 
            className={`nav-link ${isActive('reports') ? 'active' : ''}`}
            onClick={() => handleNavClick('reports')}
          >
            📊 Reports
          </a>
          <a 
            className={`nav-link ${isActive('settings') ? 'active' : ''}`}
            onClick={() => handleNavClick('settings')}
          >
            ⚙️ Settings
          </a>
        </nav>

        {/* Header Stats */}
        <div className="header-stats">
          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle"
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <div className="stat-badge">
            <span className="stat-icon">👥</span>
            <span className="stat-label">Students</span>
            <span className="stat-value">{totalStudents}</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}
    </header>
  );
}
