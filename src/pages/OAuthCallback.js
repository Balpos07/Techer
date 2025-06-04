import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for tokens in URL hash
        const hash = window.location.hash.substring(1);
        if (hash) {
          const params = new URLSearchParams(hash);
          const access = params.get("access");
          const refresh = params.get("refresh");

          if (access && refresh) {
            // Store tokens
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            
            // Update auth context with tokens
            await login({
              token: access,
              refreshToken: refresh
            });

            navigate("/");
            return;
          }
        }

        // If no hash, proceed with code exchange
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const storedState = sessionStorage.getItem("google_oauth_state");

        if (!state || state !== storedState) {
          throw new Error("Invalid state parameter");
        }

        sessionStorage.removeItem("google_oauth_state");

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/google/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            code,
            redirect_uri: 'https://techer-kappa.vercel.app/gmail-redirect'
          }),
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }

        const data = await response.json();
        
        // Store tokens from API response
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        
        await login(data.user);
        navigate("/");
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate, login]);

  return (
    <div className="oauth-callback">
      <div className="loading-spinner">
        <span>Completing login...</span>
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
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}