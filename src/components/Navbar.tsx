import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css'

function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [navbarHeight, setNavbarHeight] = useState(0);

	const navbarRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		if (navbarRef.current) {
			setNavbarHeight(navbarRef.current.offsetHeight);
		}
	}, []);

	return (
		<>
		<nav ref={navbarRef} className="navbar navbar-expand-lg fixed-top shadow-sm">
			<div className="container-fluid">
				<button
					className="navbar-toggler bg-light"
					type="button"
					onClick={toggleMenu}
					aria-controls="customNavbarNav"
					aria-expanded={menuOpen}
					aria-label="Toggle navigation"
					style={{
						fontSize: '1rem', // Adjust the font size of the icon
						padding: '0.25rem 0.75rem', // Adjust the button padding
					}}
				>
					☰
				</button>

				<div
					className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}
					id="customNavbarNav"
				>
					<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" to="/" onClick={closeMenu}>
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/about" onClick={closeMenu}>
							About
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/projects" onClick={closeMenu}>
							Projects
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/resume" onClick={closeMenu}>
							Resume
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/contact" onClick={closeMenu}>
							Contact
						</Link>
					</li>
					</ul>
				</div>
			</div>
			<ThemeToggle />
		</nav>

		<div style={{ paddingTop: `${navbarHeight}px` }}>
			<Outlet />
		</div>

		<style>
		</style>
		</>
	);
}

export default Navbar;