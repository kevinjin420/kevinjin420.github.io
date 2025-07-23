import React, { useEffect, useState, useRef } from "react";
// @ts-expect-error ts dumb
import initScene from "../components/home";
import Loader from "react-spinners/PacmanLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "About", href: "/#/about" },
  { name: "Projects", href: "/#/projects" },
  { name: "Resumé", href: "/#/resume" },
];

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSceneReady, setIsSceneReady] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const arrowRef = useRef(null);
  const threeAnimTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleLoadComplete = () => {
      setIsLoading(false);
    };

    const { cleanup, animationPromise } = initScene(handleLoadComplete);

    // @ts-expect-error shut up ts
    animationPromise.then((timeline) => {
      threeAnimTimelineRef.current = timeline as gsap.core.Timeline;
      setIsSceneReady(true);
    });

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (isLoading || !isSceneReady) return;

    const ctx = gsap.context(() => {
      gsap.to(arrowRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 3,
          end: `+=${window.innerHeight}`,
          snap: {
            snapTo: 1,
            duration: { min: 1, max: 2 },
            delay: 0.1,
            ease: "power1.inOut",
          },
        },
      });

      if (threeAnimTimelineRef.current) {
        tl.add(threeAnimTimelineRef.current);
      }

      tl.to(
        text1Ref.current,
        {
          top: "40px",
          left: "40px",
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          translateX: "0%",
          translateY: "0%",
          ease: "power2.inOut",
        },
        "<",
      );
      tl.to(
        text2Ref.current,
        {
          top: "40px",
          left: "100%",
          xPercent: -100,
          yPercent: 0,
          scale: 0.6,
          translateX: "0%",
          translateY: "0%",
          ease: "power2.inOut",
        },
        "<",
      );

      tl.to(
        [".webgl", ".nav-container"],
        {
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "<+0.2",
      );

      tl.to(arrowRef.current, { opacity: 0, duration: 0.2 }, "<");

      tl.from(
        ".nav-button",
        {
          x: 250,
          opacity: 0,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.75",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, isSceneReady]);

  return (
    <div className="overflow-x-hidden bg-black">
      <style>{`
        html, body {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
        }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <Loader color={"#ffffff"} size={70} />
        </div>
      )}

      <div
        ref={containerRef}
        className="h-screen w-full overflow-hidden relative"
      >
        <div
          ref={text1Ref}
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center md:text-left"
        >
          <h1 className="homeTitle text-gray-200 text-7xl md:text-6xl font-bold">
            Kevin J.
          </h1>
        </div>
        <div
          ref={text2Ref}
          className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center md:text-right w-max"
        >
          <h1 className="homeTitle text-gray-200 text-5xl md:text-5xl">
            Welcome to my website
          </h1>
        </div>

        <div
          ref={arrowRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        >
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        <canvas
          ref={canvasRef}
          className="webgl w-full h-full absolute top-0 left-0 opacity-0"
        />
        <nav className="nav-container fixed top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 z-10 opacity-0">
          <ul className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="nav-button block w-80 md:w-96 text-center text-2xl md:text-4xl text-gray-400 font-bold tracking-widest uppercase py-4 md:py-6 px-8 md:px-12 bg-black/30 border-2 border-cyan-400/30 rounded-lg hover:bg-cyan-400/20 hover:text-white transition-colors duration-300"
                  // onMouseEnter={() => animateArm(link.name)}
                  // onMouseLeave={() => animateArm("default")}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
