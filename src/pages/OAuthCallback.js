import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const access = params.get("access");
      const refresh = params.get("refresh");

      if (access && refresh) {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        
        // Update auth context
        await login({
          token: access,
          refreshToken: refresh
        });

        navigate("/dashboard");
      } else {
        console.error("Missing access or refresh token");
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
        }

        .loading-spinner {
          text-align: center;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}