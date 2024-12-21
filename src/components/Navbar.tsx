// import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');
    </style>    
      <nav className="navbar">
        <h1 className='signature'>
        <Link to="/"> Kevin Jin </Link>
        </h1>
        <div className="flex">
          <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          <Link to="/projects"> Projects </Link>
          <Link to="/resume"> Resume </Link>
          <Link to="/contact"> Contact </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}


export default Navbar;