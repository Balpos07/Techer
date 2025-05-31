import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login({ isDarkMode }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();

  const handleGoogleAuth = async () => {
    try {
      // Temporary mock user data until backend is ready
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        photoURL: 'https://example.com/avatar.jpg'
      };

      // Call login function from auth context
      await login(mockUser);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
   <div className={`auth-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="auth-card">
        <div className="brand-logo">
          <span>C</span>
        </div>
        <h1 className="auth-title">
          {isLogin ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="auth-description">
          {isLogin 
            ? 'Sign in to access your dashboard' 
            : 'Sign up to start using Copilot'}
        </p>
        
        <button onClick={handleGoogleAuth} className="google-button">
          <svg className="google-icon" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
      </button>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="toggle-auth" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      <style jsx>{`

       .dark {
          --bg-color: #111827;
          --text-color: #ffffff;
          --border-color: #374151;
          --sidebar-bg: #1f2937;
        }

        .dark .google-button {
          background-color: #1f2937;
          color: #ffffff;
          border-color: #374151;
        }

        .dark .google-button:hover {
          background-color: #374151;
        }

        .dark .toggle-auth {
          color: #60a5fa;
        }

        
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background-color: var(--bg-color, #f9fafb);
        }

        .auth-card {
          background-color: var(--sidebar-bg, #ffffff);
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          text-align: center;
        }

        .brand-logo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
          margin: 0 auto 24px;
        }

        .auth-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
          color: var(--text-color, #111827);
        }

        .auth-description {
          color: var(--text-color, #6b7280);
          margin-bottom: 24px;
        }

        .google-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 8px;
          background-color: white;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .google-button:hover {
          background-color: #f3f4f6;
        }

        .google-icon {
          width: 24px;
          height: 24px;
        }

        .auth-footer {
          margin-top: 24px;
          color: var(--text-color, #6b7280);
        }

        .toggle-auth {
          background: none;
          border: none;
          color: #3b82f6;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          margin-left: 4px;
        }

        .toggle-auth:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}