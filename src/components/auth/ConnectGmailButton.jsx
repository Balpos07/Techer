import React from "react";

export default function ConnectGmailButton() {
  const generateRandomState = () => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleGoogleLogin = () => {
    const state = generateRandomState();
    sessionStorage.setItem("google_oauth_state", state);
    
    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile https://www.googleapis.com/auth/gmail.readonly",
      access_type: "offline",
      prompt: "consent",
      state: state,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <button 
      onClick={handleGoogleLogin}
      className="connect-gmail-button"
    >
      Connect Gmail
      <style jsx>{`
        .connect-gmail-button {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background-color: #4285f4;
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .connect-gmail-button:hover {
          background-color: #3367d6;
        }
      `}</style>
    </button>
  );
}