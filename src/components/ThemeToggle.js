import React, { useContext } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 100,
        transition: 'background-color 0.3s ease'
      }}
    >
      {isDarkMode ? (
        <MdLightMode size={22} color="#f8f9fa" />
      ) : (
        <MdDarkMode size={22} color="#333" />
      )}
    </button>
  );
};

export default ThemeToggle;