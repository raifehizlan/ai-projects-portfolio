import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
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
import ScrollToTop from "./components/ScrollToTop";
import Ner from "./pages/Ner";
import DeidMarkdown from "./pages/DeidMarkdown";
import Classification from "./pages/Classification";
import Assertion from "./pages/AssertionStatus";
// Proje ID'ye göre uygun bileşeni döndüren yardımcı fonksiyon
function ProjectDetail() {
  const { id } = useParams();

  switch (id) {
    case "1": // id'yi string olarak karşılaştırın çünkü URL parametreleri genellikle stringdir
      return <Deid />;
    case "2": // id'yi string olarak karşılaştırın
      return <Ner />;
    case "3": // id'yi string olarak karşılaştırın
      return <Classification />;
    case "4": // id'yi string olarak karşılaştırın
      return <Assertion />;
    default:
      return <div className="proje-bulunamadi">Project is not found.</div>;
  }
}

function ResearcDetail() {
  const { id } = useParams();

  switch (id) {
    case "1": // id'yi string olarak karşılaştırın çünkü URL parametreleri genellikle stringdir
      return <DeidMarkdown />;
    default:
      return <div className="proje-bulunamadi">Article is not found.</div>;
  }
}
// Header'ı route'a göre kontrol etmek için küçük bir Wrapper yazıyoruz
function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Sadece proje detay sayfasında Header'ı gizliyoruz */}
      <Header />
      <ScrollToTop />
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
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/research/:id" element={<ResearcDetail />} />
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
