import { Outlet, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navbarHeight, setNavbarHeight] = useState(0)
  const navbarRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight)
    }
  }, [])

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 w-full bg-white dark:bg-black z-5000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={toggleMenu}
            className="text-black dark:text-white focus:outline-none sm:hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-2 py-1 rounded cursor-pointer"
            aria-controls="navbar-menu"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <div
            className={`${
              menuOpen ? 'block' : 'hidden'
            } sm:flex sm:items-center sm:space-x-6`}
            id="navbar-menu"
          >
            <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm font-medium">
              <li>
                <Link to="/" className="text-gray-800 dark:text-gray-200 hover:underline" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-800 dark:text-gray-200 hover:underline" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-800 dark:text-gray-200 hover:underline" onClick={closeMenu}>
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-gray-800 dark:text-gray-200 hover:underline" onClick={closeMenu}>
                  Resume
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-800 dark:text-gray-200 hover:underline" onClick={closeMenu}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Space below navbar */}
      <div style={{ paddingTop: `${navbarHeight}px` }}>
        <Outlet />
      </div>
    </>
  )
}

export default Navbar
