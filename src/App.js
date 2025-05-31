import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GlobalStyles from './styles/global';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
     <Router>
        <GlobalStyles />
        <Navbar 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          isSidebarOpen={isSidebarOpen}
        />
        <Routes>
          <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} />} />
        </Routes>
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          isDarkMode={isDarkMode}
        />
      </Router>
    </div>
  );
}

export default App;