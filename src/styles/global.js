import React from 'react';

export default function GlobalStyles({ isDarkMode }) {
  return (
    <style jsx global>{`

    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

 :root {
        --text-color: #1f2937;
        --text-secondary: #6b7280;
        --bg-color: #ffffff;
        --border-color: #e5e7eb;
        --sidebar-bg: #ffffff;
        --hover-bg: #f3f4f6;
        --active-bg: #e5e7eb;
        --active-color: #3b82f6;
        --icon-color: #4b5563;
        --navbar-text: #1f2937;
        --page-title: #111827;
      }

  .dark {
        --text-color: #f9fafb;
        --text-secondary: #9ca3af;
        --bg-color: #111827;
        --border-color: #374151;
        --sidebar-bg: #1f2937;
        --hover-bg: #374151;
        --active-bg: #4b5563;
        --active-color: #60a5fa;
        --icon-color: #d1d5db;
        --navbar-text: #f9fafb;
        --page-title: #f9fafb;
      }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
     font-family: "Montserrat", sans-serif;
  }

  .App {
    min-height: 100vh;
    transition: all 0.3s ease;
  }
      .dashboard {
        min-height: 100vh;
       font-family: "Montserrat", sans-serif;
        transition: all 0.3s ease;
      }

      .dashboard.light {
        background-color: #f9fafb;
        color: #111827;
      }

      .dashboard.dark {
        background-color: #111827;
        color: #ffffff;
      }

      /* Layout */
      .main-layout {
        display: flex;
        padding-top: 64px;
      }

      /* Light theme specific styles */
      .light .navbar {
        background-color: #ffffff;
        border-color: #e5e7eb;
      }

      .light .menu-button:hover,
      .light .nav-button:hover {
        background-color: #f3f4f6;
      }

      .light .sidebar {
        background-color: #ffffff;
        border-color: #e5e7eb;
      }

      .light .nav-item {
        color: #374151; 
      }

      .light .nav-item:hover {
        background-color: #f3f4f6;
        color: #1f2937;
      }

      .light .nav-item.active {
        background-color: #dbeafe;
        color: #1d4ed8;
      }

      .light .welcome-summary {
        color: #6b7280;
      }

      .light .welcome-subtitle {
        color: #6b7280;
      }

      .light .card {
        background-color: #ffffff;
        border-color: #e5e7eb;
      }

      .light .card-description {
        color: #6b7280;
      }

      .light .illustration-area {
        background: linear-gradient(to bottom right, #dbeafe, #e0e7ff);
        border-color: #e5e7eb;
      }

      .light .avatar-container {
        background-color: #ffffff;
        color: #6b7280;
      }

      .light .illustration-description {
        color: #6b7280;
      }

      /* Dark theme specific styles */
      .dark .navbar {
        background-color: #1f2937;
        border-color: #374151;
      }

      .dark .menu-button:hover,
      .dark .nav-button:hover {
        background-color: #374151;
      }

      .dark .sidebar {
        background-color: #1f2937;
        border-color: #374151;
      }

      .dark .nav-item {
       .dark .nav-item {
          color: #e5e7eb;  /* Made lighter for better contrast */
        }

        .dark .nav-item:hover {
          background-color: #374151;
          color: #ffffff;  /* Added explicit hover color */
        }


      .dark .nav-item.active {
        background-color: #2563eb;
        color: #ffffff;
      }

      .dark .welcome-summary {
        color: #9ca3af;
      }

      .dark .welcome-subtitle {
        color: #6b7280;
      }

      .dark .card {
        background-color: #1f2937;
        border-color: #374151;
      }

      .dark .card-description {
        color: #9ca3af;
      }

      .dark .illustration-area {
        background-color: #1f2937;
        border-color: #374151;
      }

      .dark .avatar-container {
        background-color: #374151;
        color: #9ca3af;
      }

      .dark .illustration-description {
        color: #9ca3af;
      }

      .dark .get-started-button {
        background-color: #2563eb;
      }

      .dark .get-started-button:hover {
        background-color: #1d4ed8;
      }

       .navbar {
        background-color: var(--sidebar-bg);
        color: var(--navbar-text);
      }

      .nav-button svg,
      .menu-button svg {
        color: var(--icon-color);
      }

      .page-title {
        color: var(--page-title);
      }

      .page-description {
        color: var(--text-secondary);
      }

      .stat-card svg {
        color: var(--icon-color);
      }

        .stat-number {
        color: var(--text-color);
      }

      .stat-label {
        color: var(--text-secondary);
      }
    `}</style>
  );
}