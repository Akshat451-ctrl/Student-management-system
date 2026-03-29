import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';

export default function HomePage({ totalStudents = 0 }) {
  const [displayedStats, setDisplayedStats] = useState({
    students: 0,
    uptime: 0,
    secure: 0,
    scalable: 0
  });

  // Animate counters when component mounts
  useEffect(() => {
    const targetStats = {
      students: totalStudents || 0,
      uptime: 24,
      secure: 100,
      scalable: 99
    };

    const animationDuration = 2500; // 2.5 seconds
    const startTime = Date.now();

    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setDisplayedStats({
        students: Math.floor(targetStats.students * progress),
        uptime: Math.floor(targetStats.uptime * progress),
        secure: Math.floor(targetStats.secure * progress),
        scalable: Math.floor(targetStats.scalable * progress)
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    const frameId = requestAnimationFrame(animateCounters);

    return () => cancelAnimationFrame(frameId);
  }, [totalStudents]);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to StudentHub</h1>
          <p>Modern Student Management System</p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-lg">Get Started</button>
            <button className="btn btn-secondary btn-lg">Learn More</button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Student Management</h3>
            <p>Easily manage and organize student records with intuitive interface</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics & Reports</h3>
            <p>Get detailed insights into student data with comprehensive reports</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Data</h3>
            <p>Your data is protected with industry-standard security measures</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Reliable</h3>
            <p>Lightning-fast performance with 99.9% uptime guarantee</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Works perfectly on all devices - desktop, tablet, and mobile</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Cloud Based</h3>
            <p>Access your data anywhere, anytime with cloud synchronization</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2>System Overview</h2>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">{displayedStats.students}</div>
            <div className="stat-name">Active Students</div>
            <div className="stat-description">Currently managed in the system</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{displayedStats.uptime}/7</div>
            <div className="stat-name">Uptime</div>
            <div className="stat-description">Reliable service guarantee</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{displayedStats.secure}%</div>
            <div className="stat-name">Secure</div>
            <div className="stat-description">Data protection certified</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{displayedStats.scalable}%</div>
            <div className="stat-name">Scalable</div>
            <div className="stat-description">Grows with your needs</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of institutions using StudentHub to manage their students efficiently</p>
        <button className="btn btn-primary btn-lg">Start Free Trial</button>
      </section>
    </div>
  );
}
