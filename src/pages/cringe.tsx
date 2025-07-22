import React, { useEffect, useState, useRef } from "react";
// Correctly import both the default and named exports
import initScene, { animateArm } from "../components/home";
import Loader from "react-spinners/PacmanLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "About", href: "/#/about" },
  { name: "Projects", href: "/#/projects" },
  { name: "Resume", href: "/#/resume" },
  { name: "Contact", href: "/#/contact" },
];

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // State to track when the 3D scene and its animations are fully loaded and ready.
  const [isSceneReady, setIsSceneReady] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  // A ref to hold the animation timeline returned from our Three.js script.
  const threeAnimTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // This effect runs once to initialize the Three.js scene.
  useEffect(() => {
    const handleLoadComplete = () => {
      setIsLoading(false);
    };

    // initScene now returns a cleanup function and a promise.
    const { cleanup, animationPromise } = initScene(handleLoadComplete);

    // When the promise resolves, it means the 3D model is loaded and the animation timeline is created.
    animationPromise.then((timeline) => {
      threeAnimTimelineRef.current = timeline as gsap.core.Timeline;
      setIsSceneReady(true); // Mark the scene as ready.
    });

    // Return the cleanup function to be called when the component unmounts.
    return () => {
      cleanup();
    };
  }, []);

  // This effect sets up all the scroll-based animations.
  // It depends on `isLoading` and `isSceneReady` to ensure it only runs when everything is ready.
  useEffect(() => {
    if (isLoading || !isSceneReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: `+=${window.innerHeight}`, // Increased scroll length for a smoother animation
        },
      });

      // Add the entire 3D animation timeline to the main scroll timeline.
      // This syncs the rover and camera movements with the scrollbar.
      if (threeAnimTimelineRef.current) {
        tl.add(threeAnimTimelineRef.current);
      }

      // Animate the UI elements in sync with the 3D animation.
      // The "<" position parameter starts these tweens at the same time as the 3D timeline.
      tl.to(text1Ref.current, {
        top: '40px',
        left: '40px',
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      }, "<");
      tl.to(text2Ref.current, {
        top: '40px',
        left: '100%',
        x: '-40px',
        xPercent: -100,
        yPercent: 0,
        scale: 0.6,
        ease: "power2.inOut",
      }, "<");

      tl.from(['.webgl', '.nav-container'], {
        y: () => window.innerHeight,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
      }, "<+0.2");
      
      tl.from(".nav-button", {
        x: 250,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
      }, "-=0.75");

    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, isSceneReady]);

  return (
    <div className="overflow-x-hidden bg-gray-900">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <Loader color={"#ffffff"} loading={isLoading} size={100} aria-label="Loading Spinner" />
        </div>
      )}

      <div ref={containerRef} className="h-screen w-full overflow-hidden relative">
        <div ref={text1Ref} className="absolute left-1/2 z-20 text-center md:text-left">
          <h1 className="homeTitle text-gray-200 text-6xl md:text-9xl font-bold">Kevin J.</h1>
        </div>
        <div ref={text2Ref} className="absolute left-1/2 z-20 text-center md:text-right w-max">
          <h1 className="homeTitle text-gray-200 text-5xl md:text-6xl">Welcome to my website</h1>
          <h2 className="homeTitle text-gray-400 text-lg md:text-xl">have fun exploring!</h2>
        </div>
        <canvas ref={canvasRef} className="webgl w-full h-full absolute top-0 left-0" />
        <nav className="nav-container fixed top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 z-10">
          <ul className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="nav-button block w-80 md:w-96 text-center text-2xl md:text-4xl text-gray-400 font-bold tracking-widest uppercase py-4 md:py-6 px-8 md:px-12 bg-black/30 border-2 border-cyan-400/30 rounded-lg backdrop-blur-sm hover:bg-cyan-400/20 hover:text-white transition-colors duration-300"
                  // Add hover events to trigger the arm animations
                  onMouseEnter={() => animateArm(link.name)}
                  onMouseLeave={() => animateArm('default')}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* This empty div creates the scrollable space needed for ScrollTrigger to work with pin:true */}
      <div className="h-screen"></div>
    </div>
  );
};

export default HomePage;
