import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  return (
    <button
      className="btn"
      onClick={() => setIsDarkMode(prev => !prev)}
    >
      <i className={`bi ${isDarkMode ? 'bi-moon-stars' : 'bi-sun'}`}></i>
    </button>
  );
}

export default ThemeToggle;
