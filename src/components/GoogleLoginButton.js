import React from "react";
import { Button } from "./ui/button";
import { GoogleIcon } from "./icons/GoogleIcon";

const GoogleLoginButton = () => {
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
      redirect_uri: "https://4f89-105-113-94-78.ngrok-free.app/api/auth/login/callback",
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
      state: state,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <Button 
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
    >
      <GoogleIcon className="w-5 h-5" />
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;