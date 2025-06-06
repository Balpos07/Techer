import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // First check URL hash for direct token response
        const hash = window.location.hash.substring(1);
        if (hash) {
          const params = new URLSearchParams(hash);
          const access = params.get("access");
          const refresh = params.get("refresh");

          if (access && refresh) {
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            
            // Decode JWT payload to get user data
            try {
              const userData = JSON.parse(atob(access.split('.')[1]));
              await login({
                token: access,
                refreshToken: refresh,
                user: userData
              });
              navigate("/");
              return;
            } catch (e) {
              console.error("Failed to parse JWT:", e);
              throw new Error("Invalid token format");
            }
          }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const storedState = sessionStorage.getItem("google_oauth_state");

        if (!code) {
          throw new Error("No authorization code found");
        }

        if (!state || state !== storedState) {
          throw new Error("Invalid state parameter");
        }

        // Clear stored state
        sessionStorage.removeItem("google_oauth_state");

        // Exchange code for tokens
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/google/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            code,
            redirect_ : process.env.REACT_APP_REDIRECT_URI // Note: Using REDIRECT_URI not REDIRECT_URL
          }),
          credentials: 'include'
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Authentication failed');
        }

        const data = await response.json();
        
        if (!data.access_token || !data.refresh_token) {
          throw new Error('Invalid token response from server');
        }

        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        
        await login(data.user);
        navigate("/");
      } catch (error) {
        console.error("Authentication failed:", error);
        setError(error.message);
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    handleCallback();
  }, [navigate, login]);

  if (error) {
    return (
      <div className="oauth-callback">
        <div className="error-message">
          <span>{error}</span>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="oauth-callback">
      <div className="loading-spinner">
        <span>Completing authentication...</span>
      </div>

      <style jsx>{`
        .oauth-callback {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-color, #f9fafb);
        }

        .loading-spinner {
          text-align: center;
          color: var(--text-color, #374151);
        }

        .error-message {
          text-align: center;
          color: var(--error-color, #dc2626);
        }
      `}</style>
    </div>
  );
}