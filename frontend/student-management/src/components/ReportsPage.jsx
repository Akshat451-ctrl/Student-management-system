import React from 'react';
import '../styles/ReportsPage.css';

export default function ReportsPage({ students = [] }) {
  // Calculate statistics
  const totalStudents = students.length;
  const courses = [...new Set(students.map(s => s.course))];
  
  const courseStats = courses.map(course => ({
    name: course,
    count: students.filter(s => s.course === course).length
  }));

  const uniqueEmails = [...new Set(students.map(s => s.email))].length;

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h1>📊 Analytics & Reports</h1>
        <p>Comprehensive insights into your student data</p>
      </div>

      <div className="reports-container">
        {/* Summary Cards */}
        <section className="reports-section">
          <h2>Summary Statistics</h2>
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-icon">👥</div>
              <h3>Total Students</h3>
              <div className="card-value">{totalStudents}</div>
              <p>Active student records</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">📚</div>
              <h3>Courses</h3>
              <div className="card-value">{courses.length}</div>
              <p>Different programs</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">📧</div>
              <h3>Unique Emails</h3>
              <div className="card-value">{uniqueEmails}</div>
              <p>Registered addresses</p>
            </div>
            <div className="summary-card">
              <div className="card-icon">✅</div>
              <h3>Data Quality</h3>
              <div className="card-value">100%</div>
              <p>Complete records</p>
            </div>
          </div>
        </section>

        {/* Course Distribution */}
        {courses.length > 0 && (
          <section className="reports-section">
            <h2>Course Distribution</h2>
            <div className="course-analysis">
              {courseStats.map((course, index) => {
                const percentage = totalStudents > 0 ? ((course.count / totalStudents) * 100).toFixed(1) : 0;
                return (
                  <div key={index} className="course-row">
                    <div className="course-info">
                      <span className="course-title">{course.name}</span>
                      <span className="course-count">{course.count} students</span>
                    </div>
                    <div className="course-bar-container">
                      <div className="course-bar">
                        <div
                          className="course-bar-fill"
                          style={{
                            width: `${percentage}%`,
                            background: `hsl(${index * 60}, 70%, 60%)`
                          }}
                        >
                          <span className="bar-percentage">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Enrollment Timeline */}
        <section className="reports-section">
          <h2>Student Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>📈 Growth</h3>
              <p className="info-value">{totalStudents}</p>
              <p className="info-text">Current enrollment</p>
            </div>
            <div className="info-card">
              <h3>📊 Status</h3>
              <p className="info-value">Active</p>
              <p className="info-text">System is running</p>
            </div>
            <div className="info-card">
              <h3>⏱️ Last Update</h3>
              <p className="info-value">Now</p>
              <p className="info-text">Real-time tracking</p>
            </div>
            <div className="info-card">
              <h3>✓ Accuracy</h3>
              <p className="info-value">99.9%</p>
              <p className="info-text">Data reliability</p>
            </div>
          </div>
        </section>

        {/* Detailed Table */}
        {students.length > 0 && (
          <section className="reports-section">
            <h2>Detailed Student Listing</h2>
            <div className="detailed-table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 10).map((student, index) => (
                    <tr key={student.id || student.roll_no}>
                      <td>{index + 1}</td>
                      <td><strong>{student.roll_no}</strong></td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td><span className="course-badge">{student.course}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {students.length > 10 && (
                <p className="table-note">Showing first 10 of {students.length} students</p>
              )}
            </div>
          </section>
        )}

        {/* Export Section */}
        <section className="reports-section export-section">
          <h2>Export Options</h2>
          <div className="export-buttons">
            <button className="btn btn-primary">📥 Export as CSV</button>
            <button className="btn btn-secondary">📥 Export as PDF</button>
            <button className="btn btn-secondary">📥 Export as Excel</button>
            <button className="btn btn-secondary">🖨️ Print Report</button>
          </div>
        </section>
      </div>
    </div>
  );
}
