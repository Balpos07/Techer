import React from 'react';
import GoogleIcon from '../icons/GoogleIcon';

export default function GoogleLoginButton({ isDarkMode, variant = 'login' }) {
  const generateRandomState = () => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

 const handleGoogleAuth = () => {
  const state = generateRandomState();
  sessionStorage.setItem("google_oauth_state", state);
  
  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,  // Use from .env
    response_type: "code",
    scope: variant === 'gmail' 
      ? "openid email profile https://www.googleapis.com/auth/gmail.readonly"
      : "openid email profile",
    access_type: "offline",
    prompt: "consent",
    state: state,
  });

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

  return (
    <button
      onClick={handleGoogleAuth}
      className={`google-button ${isDarkMode ? 'dark' : ''}`}
    >
      <GoogleIcon className="google-icon" />
      {variant === 'gmail' ? 'Connect Gmail' : 'Continue with Google'}
      
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