import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // initialize from localStorage
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('bg-dark', 'text-white');
      body.classList.remove('bg-light', 'text-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('bg-light', 'text-dark');
      body.classList.remove('bg-dark', 'text-white');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      className="btn btn-secondary"
      onClick={() => setIsDarkMode(prev => !prev)}
    >
        <i className={`bi ${isDarkMode ? 'bi-moon-stars' : 'bi-sun'}`}></i>
    </button>
  );
}

export default ThemeToggle;
