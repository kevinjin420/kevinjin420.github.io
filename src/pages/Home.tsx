import React, { useEffect, useState, useRef } from "react";
// @ts-expect-error - Assuming d.ts file is not recognized by your setup
import initScene from "../components/home"; // , { animateArm } 
import Loader from "react-spinners/PacmanLoader";
import { gsap } from "gsap";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        ".nav-button", // Target all buttons with this class
        {
          x: 250,
          opacity: 0,
        },
        {
          x: 0, // End position
          opacity: 1,
          duration: 2,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, [isLoading]);

  useEffect(() => {
    const handleLoadComplete = () => {
      setIsLoading(false);
    };

    const cleanup = initScene(handleLoadComplete);

    return () => {
      cleanup();
    };
  }, []);

  const navLinks = [
    { name: "About", href: "/#/about" },
    { name: "Projects", href: "/#/projects" },
    { name: "Resume", href: "/#/resume" },
    { name: "Contact", href: "/#/contact" },
  ];

  return (
    <div className="w-screen h-screen bg-gray-900 overflow-hidden">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <Loader
            color={"#ffffff"}
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
          />
        </div>
      )}

      <canvas
        className={`webgl w-full h-full ${isLoading ? "invisible" : "visible"}`}
      />

      <nav className="fixed top-1/2 right-[30%] -translate-y-1/2 z-10">
        <ul className="flex flex-col space-y-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="nav-button block w-96 text-center text-4xl text-gray-400 font-bold tracking-widest uppercase py-6 px-12 bg-black/30 border-2 border-cyan-400/30 rounded-lg hover:bg-cyan-400/20 hover:text-white transition-colors duration-300 opacity-0"
                // onMouseEnter={() => animateArm(link.name)}
                // onMouseLeave={() => animateArm('default')}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
