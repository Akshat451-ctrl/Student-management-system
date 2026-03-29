import { useState, useEffect } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import StudentDashboard from './components/StudentDashboard'
import ReportsPage from './components/ReportsPage'
import SettingsPage from './components/SettingsPage'
import './App.css'

function App() {
  const [totalStudents, setTotalStudents] = useState(0)
  const [currentPage, setCurrentPage] = useState('home')
  const [students, setStudents] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme === 'dark'
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Apply theme to document and save preference
  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [darkMode])

  const updateStudentCount = (count) => {
    setTotalStudents(count)
  }

  const updateStudents = (studentList) => {
    setStudents(studentList)
  }

  const handleNavigation = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage totalStudents={totalStudents} />
      case 'students':
        return <StudentDashboard onStudentCountChange={updateStudentCount} onStudentsUpdate={updateStudents} />
      case 'reports':
        return <ReportsPage students={students} />
      case 'settings':
        return <SettingsPage />
      default:
        return <HomePage totalStudents={totalStudents} />
    }
  }

  return (
    <div className="app-container">
      <Header 
        totalStudents={totalStudents} 
        onNavigate={handleNavigation} 
        currentPage={currentPage}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      {renderPage()}
    </div>
  )
}

export default App
