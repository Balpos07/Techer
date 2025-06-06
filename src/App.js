import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import GlobalStyles from "./styles/global";
import Home from "./pages/Home";
import Email from "./pages/Email";
import Meeting from "./pages/Meeting";
import Task from "./pages/Task";
import Settings from "./pages/Settings";
import GoogleLoginButton from "./components/auth/GoogleLoginButton";
import OAuthCallback from "./pages/OAuthCallback";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, login, logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      <Router>
        <GlobalStyles isDarkMode={isDarkMode} />
        {!user ? (
          <Routes>
            <Route path="/login" element={<Login onLogin={login} isDarkMode={isDarkMode} />} />
            <Route path="/gmail-redirect" element={<OAuthCallback />} />
            <Route path="/connect-gmail" element={<GoogleLoginButton isDarkMode={isDarkMode} variant="gmail" />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <>
            <Navbar
              toggleSidebar={toggleSidebar}
              toggleDarkMode={toggleDarkMode}
              isDarkMode={isDarkMode}
              isSidebarOpen={isSidebarOpen}
              onLogout={logout}
            />
            <Sidebar isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />
            <Routes>
              <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />} />
              <Route path="/email" element={<Email isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />} />
              <Route path="/meetings" element={<Meeting isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />} />
              <Route path="/tasks" element={<Task isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />} />
              <Route path="/settings" element={<Settings isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </>
        )}
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
