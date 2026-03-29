import React, { useState, useEffect } from 'react';
import '../styles/StudentForm.css';

export default function StudentForm({ onSubmit, onCancel, editingStudent = null, students = [] }) {
  const [formData, setFormData] = useState({
    roll_no: '',
    name: '',
    email: '',
    course: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        roll_no: editingStudent.roll_no,
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
      });
    } else {
      setFormData({ roll_no: '', name: '', email: '', course: '' });
    }
    setErrors({});
    setSubmitted(false);
  }, [editingStudent]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.roll_no) {
      newErrors.roll_no = 'Roll number is required';
    } else if (isNaN(formData.roll_no) || formData.roll_no <= 0) {
      newErrors.roll_no = 'Roll number must be a positive number';
    } else if (!editingStudent && students.some(s => s.roll_no == formData.roll_no)) {
      newErrors.roll_no = 'Roll number already exists';
    }

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.course) {
      newErrors.course = 'Course is required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...formData,
        roll_no: parseInt(formData.roll_no),
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="roll_no">Roll Number *</label>
            <input
              type="number"
              id="roll_no"
              name="roll_no"
              value={formData.roll_no}
              onChange={handleChange}
              placeholder="Enter roll number"
              disabled={!!editingStudent}
              className={errors.roll_no ? 'input-error' : ''}
            />
            {errors.roll_no && <span className="error-message">{errors.roll_no}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter course name"
              className={errors.course ? 'input-error' : ''}
            />
            {errors.course && <span className="error-message">{errors.course}</span>}
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {editingStudent ? 'Update' : 'Add'} Student
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
