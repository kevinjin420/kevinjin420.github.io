import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // initialize from localStorage
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
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
