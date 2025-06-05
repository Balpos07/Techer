import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import GlobalStyles from './styles/global';
import Home from './pages/Home';
import Email from './pages/Email';
import Meeting from './pages/Meeting';
import Task from './pages/Task';
import Settings from './pages/Settings';
import ConnectGmailButton from './components/auth/ConnectGmailButton';
import OAuthCallback from './pages/OAuthCallback';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, login, logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Router>
        <GlobalStyles isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/login" element={
            !user ? (
              <Login onLogin={login} isDarkMode={isDarkMode} />
            ) : (
              <Navigate to="/" replace />
            )
          } />
             <Route path="/gmail-redirect" element={<OAuthCallback />} />
          <Route path="/connect-gmail" element={<ConnectGmailButton />} />
             <Route path="/oauth/callback" element={<OAuthCallback />} />
          <Route
            path="/*"
            element={
              user ? (
                <>
                  <Navbar 
                    toggleSidebar={toggleSidebar} 
                    toggleDarkMode={toggleDarkMode}
                    isDarkMode={isDarkMode}
                    isSidebarOpen={isSidebarOpen}
                    onLogout={logout}
                  />
                  <Routes>
                    <Route path="/" element={
                      <Home isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />
                    } />
                    <Route path="/email" element={
                      <Email isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />
                    } />
                    <Route path="/meetings" element={
                      <Meeting isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />
                    } />
                    <Route path="/tasks" element={
                      <Task isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />
                    } />
                    <Route path="/settings" element={
                      <Settings isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />
                    } />
                  </Routes>
                  <Sidebar 
                    isSidebarOpen={isSidebarOpen} 
                    isDarkMode={isDarkMode}
                  />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;