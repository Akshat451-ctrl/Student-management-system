import React, { useState, useEffect } from 'react';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import StudentProfile from './StudentProfile';
import ConfirmDialog from './ConfirmDialog';
import { studentService } from '../api/studentService';
import '../styles/StudentDashboard.css';

export default function StudentDashboard({ onStudentCountChange = () => {}, onStudentsUpdate = () => {} }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Load students on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
      onStudentCountChange(data.length);
      onStudentsUpdate(data);
    } catch (error) {
      showMessage('error', 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await studentService.updateStudent(editingStudent.roll_no, formData);
        showMessage('success', 'Student updated successfully');
      } else {
        await studentService.createStudent(formData);
        showMessage('success', 'Student added successfully');
      }
      setShowForm(false);
      setEditingStudent(null);
      loadStudents();
    } catch (error) {
      showMessage('error', error.message || 'Failed to save student');
    }
  };

  const handleDeleteClick = (rollNo) => {
    setDeleteConfirm(rollNo);
  };

  const handleConfirmDelete = async () => {
    try {
      await studentService.deleteStudent(deleteConfirm);
      showMessage('success', 'Student deleted successfully');
      setDeleteConfirm(null);
      loadStudents();
    } catch (error) {
      showMessage('error', 'Failed to delete student');
      setDeleteConfirm(null);
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_no.toString().includes(searchTerm) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <StudentProfile students={students} />

      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="dashboard-controls">
        <button className="btn btn-primary btn-lg" onClick={handleAddStudent}>
          + Add New Student
        </button>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, roll no, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setSearchTerm('');
              loadStudents();
            }}
          >
            Show All
          </button>
        </div>
      </div>

      <StudentList
        students={filteredStudents}
        onEdit={handleEditStudent}
        onDelete={handleDeleteClick}
        loading={loading}
      />

      {showForm && (
        <StudentForm
          editingStudent={editingStudent}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingStudent(null);
          }}
          students={students}
        />
      )}

      {deleteConfirm !== null && (
        <ConfirmDialog
          title="Delete Student"
          message={`Are you sure you want to delete the student with roll number ${deleteConfirm}? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm(null)}
          confirmText="Delete"
          cancelText="Cancel"
          isDanger={true}
        />
      )}
    </div>
  );
}
