import { HashRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Page404 from './pages/Page404';

export default function App() {
  return (
    <HashRouter>
      <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="resume" element={<Resume />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      </Routes>
    </HashRouter>
  )
}