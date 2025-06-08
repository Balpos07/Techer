import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Login({ isDarkMode }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); 

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    company_name: '',
    role: '',
    agreed_to_terms: false
  });

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
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
      state: state,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin 
        ? "https://techer.work.gd/api/auth/login/" 
        : "https://techer.work.gd/api/auth/signup/";

      // Prepare the data to send
      let requestData;
      if (isLogin) {
        requestData = {
          email: formData.email,
          password: formData.password
        };
      } else {
        requestData = {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          company_name: formData.company_name,
          role: formData.role,
          agreed_to_terms: formData.agreed_to_terms
        };
      }

          console.log('Sending request to:', endpoint);
    console.log('Request data:', requestData);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(requestData),
      credentials: 'include'
      });

     const data = await response.json();
    console.log('Response:', data);

      if (!response.ok) {
      // Handle specific error messages from the server
      const errorMessage = data.detail || data.message || "Something went wrong";
      throw new Error(errorMessage);
    }

      if (isLogin) {
      // Handle login success
      await login(data);
      navigate("/");
    } else {
      // Handle signup success
      setIsLogin(true);
      setFormData(prev => ({
        ...prev,
        password: '' // Clear password after signup
      }));
      setError("Account created successfully! Please log in.");
    }
  } catch (err) {
    console.error('Auth Error:', err);
    setError(err.message || "Failed to process your request");
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className={`auth-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="auth-card">
        <div className="brand-logo">
          <span>T</span>
        </div>
        <h1 className="auth-title">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p className="auth-description">
          {isLogin
            ? "Sign in to access your dashboard"
            : "Sign up to start using Techers"}
        </p>

        {error && <div className="error-message">{error}</div>}

        <button onClick={handleGoogleAuth} className="google-button">
          <svg className="google-icon" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="auth-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <div className="input-group">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  className="auth-input"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  className="auth-input"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="auth-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone number"
                className="auth-input"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="company_name"
                placeholder="Company name"
                className="auth-input"
                value={formData.company_name}
                onChange={handleChange}
              />
              <select 
                className="auth-input" 
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your role</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="admin">Administrator</option>
              </select>
              <div className="terms-container">
                <label className="terms-label">
                  <input 
                    type="checkbox" 
                    className="terms-checkbox" 
                    name="agreed_to_terms"
                    checked={formData.agreed_to_terms}
                    onChange={handleChange}
                    required
                  />
                  <span className="terms-text">
                    I agree to the{" "}
                    <a href="/terms" className="terms-link">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="terms-link">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>
            </>
          )}
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="toggle-auth"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              disabled={loading}
            >
              {isLogin ? "Sign up" : "Sign in"}
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
          --input-bg: #1f2937;
          --error-bg: #7f1d1d;
          --error-text: #fecaca;
        }

        .light {
          --error-bg: #fee2e2;
          --error-text: #b91c1c;
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

        .dark .auth-input {
          background-color: var(--input-bg);
          border-color: var(--border-color);
          color: var(--text-color);
        }

        .dark .divider {
          color: var(--text-color);
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

        .error-message {
          background-color: var(--error-bg);
          color: var(--error-text);
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
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

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 24px 0;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid var(--border-color);
        }

        .divider span {
          padding: 0 10px;
          color: var(--text-color, #6b7280);
          font-size: 14px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .auth-input {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 8px;
          background-color: var(--sidebar-bg, #ffffff);
          color: var(--text-color, #374151);
        }

        .auth-input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover:not(:disabled) {
          background-color: #2563eb;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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

        .toggle-auth:hover:not(:disabled) {
          text-decoration: underline;
        }

        .toggle-auth:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .input-group {
          display: flex;
          gap: 12px;
        }

        .input-group .auth-input {
          flex: 1;
        }

        .terms-container {
          text-align: left;
        }

        .terms-label {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 14px;
          color: var(--text-color, #6b7280);
        }

        .terms-checkbox {
          margin-top: 3px;
        }

        .terms-text {
          line-height: 1.4;
        }

        .terms-link {
          color: #3b82f6;
          text-decoration: none;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        select.auth-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
          padding-right: 40px;
        }

        .dark select.auth-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
        }

        @media (max-width: 640px) {
          .auth-card {
            padding: 24px;
          }
          .input-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}