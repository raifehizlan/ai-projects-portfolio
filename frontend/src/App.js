import React from 'react';
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects"; // Projects bileşenini import et
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Home />
      <About />
      <Experience />
      <Projects /> {/* Projects bileşenini ekle */}
      {/* Diğer bölümler */}
    </div>
  );
}

export default App;