import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

function Navbar() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Resumé", to: "/resume" },
  ];

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 w-full bg-white dark:bg-black z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="sm:hidden">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 p-2 rounded cursor-pointer aspect-square">
                <ChevronDownIcon className="size-5" />
              </MenuButton>
              <MenuItems className="absolute left-0 mt-2 w-40 origin-top-left bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded shadow-lg focus:outline-none z-50">
                <div className="py-1">
                  {navItems.map((item) => (
                    <MenuItem key={item.to}>
                      {() => (
                        <Link
                          to={item.to}
                          className="block px-4 py-2 text-sm bg-white dark:bg-black
                         text-gray-800 dark:text-gray-200"
                        >
                          {item.label}
                        </Link>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <ul className="flex space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-gray-800 dark:text-gray-200 text-xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Space below navbar */}
      <div style={{ paddingTop: `${navbarHeight}px` }}>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
