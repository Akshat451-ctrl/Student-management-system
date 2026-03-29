// API Service for Student Management
const API_BASE_URL = 'http://localhost:8000';

export const studentService = {
  // Get all students
  getAllStudents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (!response.ok) throw new Error('Failed to fetch students');
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  // Create a new student
  createStudent: async (studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) throw new Error('Failed to create student');
      return await response.json();
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  // Update a student
  updateStudent: async (rollNo, studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${rollNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) throw new Error('Failed to update student');
      return await response.json();
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  // Delete a student
  deleteStudent: async (rollNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${rollNo}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete student');
      return await response.json();
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  },
};
