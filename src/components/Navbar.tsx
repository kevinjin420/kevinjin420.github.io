// import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');
    </style>
      <nav className="navbar">
        <h1 className="signature">
          <Link to="/"> Kevin Jin </Link>
        </h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}> Home </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}> About </Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}> Projects </Link>
          <Link to="/resume" onClick={() => setMenuOpen(false)}> Resume </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}> Contact </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}


export default Navbar;