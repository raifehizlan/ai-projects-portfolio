import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeSlider.css";

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true, // Kullanıcı manuel kaydırabilsin diye oklar aktif
    pauseOnHover: true,
    swipeToSlide: true, // Dokunmatik ve mouse swipe
    adaptiveHeight: true
  };

  const slides = [
    {
      title: "Why a Medical NLP Platform?",
      subtitle: "Unlock the power of unstructured medical text using secure and scalable microservices."
    },
    {
      title: "One Platform. Five NLP Tasks.",
      subtitle: "Deidentification, Named Entity Recognition, Text Classification, Assertion Detection, and Relation Extraction — each as an independent service."
    },
    {
      title: "Built as Microservices",
      subtitle: "Each task runs in a standalone service with its own API, model, and frontend – containerized and ready to deploy."
    },
    {
      title: "Try the Demos. Read the Articles.",
      subtitle: "Interact with real models and explore brief multilingual articles explaining each one."
    },
    {
      title: "Modern and Scalable Tech Stack",
      subtitle: "React, Node.js, Docker, GitHub Actions, Azure — engineered for performance, automation, and ease of use."
    }
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p className="slideParagraph">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
