import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Page404 from './pages/Page404';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="projects" element={<Projects />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  </Routes>
  )
}

export default App
