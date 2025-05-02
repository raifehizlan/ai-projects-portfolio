import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Deid from "./pages/Deid";
import "./App.css";

// Header'ı route'a göre kontrol etmek için küçük bir Wrapper yazıyoruz
function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Sadece proje detay sayfasında Header'ı gizliyoruz */}
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Experience />
              <Projects />
              <Research />
              <Skills />
              <Contact />
            </>
          }
        />
        <Route
          path="/project/:id"
          element={
            <>
              <Deid />
            </>
          }
        />
      </Routes>

      {/* Footer her zaman görünsün */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <Layout />
      </div>
    </Router>
  );
}

export default App;
