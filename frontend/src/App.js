import React from 'react';
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects"; // Projects bileşenini import et
import Research from "./components/Research";
import Skills from "./components/Skills";
import Contact from "./components/Contact"; // Contact bileşenini import edin
import Footer from "./components/Footer"; // Footer bileşenini import edin

import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Home />
      <About />
      <Experience />
      <Projects />
      <Research />
      <Skills />
      <Contact />
      <Footer /> {/* Footer bileşenini ekleyin */}
      {/* Diğer bölümler */}
    </div>
  );
}

export default App;