import './App.css'
// import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Page404 from './pages/Page404';

export default function App() {
  return (
    <HashRouter>
      <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      </Routes>
    </HashRouter>
  )
}

// const root = createRoot(document.getElementById('root'));
// root.render(<App/>);

