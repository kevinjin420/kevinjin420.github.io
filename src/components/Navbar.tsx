// import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className='signature'>
          Shengran (Kevin) Jin
        </div>
        <div className="flex">
          <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          <Link to="/projects"> Projects </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}


export default Navbar;