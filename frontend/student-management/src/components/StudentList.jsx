import React from 'react';
import '../styles/StudentList.css';

export default function StudentList({ students = [], onEdit, onDelete, loading = false }) {
  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <h3>No students found</h3>
        <p>Click "Add New Student" to create your first student record</p>
      </div>
    );
  }

  return (
    <div className="students-table-wrapper">
      <table className="students-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id || student.roll_no}>
              <td>{student.roll_no}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td className="action-buttons">
                <button
                  className="btn btn-small btn-edit"
                  onClick={() => onEdit(student)}
                  title="Edit student"
                >
                  Edit
                </button>
                <button
                  className="btn btn-small btn-delete"
                  onClick={() => onDelete(student.roll_no)}
                  title="Delete student"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <p>Total Students: <strong>{students.length}</strong></p>
      </div>
    </div>
  );
}
