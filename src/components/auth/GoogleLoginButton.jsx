
import React from 'react';
import GoogleIcon from '../icons/GoogleIcon';

export default function GoogleLoginButton({ onClick, isDarkMode }) {
  return (
    <button
      onClick={onClick}
      className={`google-button ${isDarkMode ? 'dark' : ''}`}
    >
      <GoogleIcon className="google-icon" />
      Continue with Google
      
      <style jsx>{`
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

        .google-button.dark {
          background-color: #1f2937;
          color: #ffffff;
          border-color: #374151;
        }

        .google-button.dark:hover {
          background-color: #374151;
        }

        .google-icon {
          width: 24px;
          height: 24px;
        }
      `}</style>
    </button>
  );
}