// import React from "react";
import { Routes, Route } from "react-router-dom";

// Import pages
import Home from "./App";
import About from "./pages/About";
import Projects from "./pages/Projects";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/about" Component={About} />
      <Route path="/projects" Component={Projects} />
    </Routes>
  );
};

export default AppRoutes;
