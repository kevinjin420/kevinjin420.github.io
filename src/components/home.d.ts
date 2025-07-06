// Declaring the 'home' module to provide type information for home.js (or home.tsx)
declare module './home' {
  // Export the 'initThreeScene' function type
  export function initScene(): () => void;
}
