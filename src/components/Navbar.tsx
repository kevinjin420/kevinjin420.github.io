// import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div>
        TEXT
      </div>
      <div className="flex">
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/projects"> Projects </Link>
      </div>
    </nav>
  );
}


export default Navbar;