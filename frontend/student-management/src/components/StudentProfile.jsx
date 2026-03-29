import React from 'react';
import '../styles/StudentProfile.css';

export default function StudentProfile({ students = [] }) {
  // Calculate statistics
  const totalStudents = students.length;
  const courses = [...new Set(students.map(s => s.course))];
  const uniqueCourses = courses.length;

  // Group students by course
  const courseStats = courses.map(course => ({
    name: course,
    count: students.filter(s => s.course === course).length
  }));

  return (
    <div className="student-profile-section">
      <div className="profile-header">
        <h3>📊 Dashboard Overview</h3>
        <p>System Statistics & Insights</p>
      </div>

      <div className="profile-stats-grid">
        {/* Total Students Card */}
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' }}>
            👥
          </div>
          <div className="stat-card-content">
            <h4>Total Students</h4>
            <p className="stat-value">{totalStudents}</p>
            <span className="stat-change">Active records</span>
          </div>
        </div>

        {/* Unique Courses Card */}
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }}>
            📚
          </div>
          <div className="stat-card-content">
            <h4>Courses</h4>
            <p className="stat-value">{uniqueCourses}</p>
            <span className="stat-change">Different programs</span>
          </div>
        </div>

        {/* Database Status Card */}
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)' }}>
            ✅
          </div>
          <div className="stat-card-content">
            <h4>Status</h4>
            <p className="stat-value">Active</p>
            <span className="stat-change">All systems running</span>
          </div>
        </div>

        {/* Last Updated Card */}
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' }}>
            ⏱️
          </div>
          <div className="stat-card-content">
            <h4>Updated</h4>
            <p className="stat-value">Now</p>
            <span className="stat-change">Real-time tracking</span>
          </div>
        </div>
      </div>

      {/* Course Distribution */}
      {uniqueCourses > 0 && (
        <div className="course-distribution">
          <h4>📖 Course Distribution</h4>
          <div className="course-list">
            {courseStats.map((course, index) => (
              <div key={index} className="course-item">
                <div className="course-name">{course.name}</div>
                <div className="course-bar">
                  <div
                    className="course-bar-fill"
                    style={{
                      width: `${(course.count / totalStudents) * 100}%`,
                      background: `hsl(${index * 60}, 70%, 60%)`
                    }}
                  ></div>
                </div>
                <div className="course-count">{course.count} students</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
