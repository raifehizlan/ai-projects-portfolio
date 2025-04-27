import React, { useState } from 'react';
import './Experience.css';

function Experience() {
  const [activeTab, setActiveTab] = useState('professional');

  const showTimeline = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="experience" id="experience">
      <h1>Experience</h1>
      <p>My journey in the academic & professional front</p>
      <div className="tabs">
        <button
          id="academicBtn"
          className={`tab ${activeTab === "academic" ? "active" : ""}`}
          onClick={() => showTimeline("academic")}
        >
          Academic
        </button>
        <button
          id="professionalBtn"
          className={`tab ${activeTab === "professional" ? "active" : ""}`}
          onClick={() => showTimeline("professional")}
        >
          Professional
        </button>
      </div>

      <div
        id="academic"
        className={`timeline ${activeTab === "academic" ? "active" : ""}`}
      >
        <div className="event">
          <h3>Master in Artificial Intelligence and Innovation Technology</h3>{" "}
          {/* Akademik deneyiminizi güncelleyin */}
          <p>MIA Digital University, Spain & Udima University, Spain, Online</p>
        </div>
        <div className="event">
          <h3>Bachelor in System Engineering – Graduation Grade: 3.74/4</h3>{" "}
          {/* Akademik deneyiminizi güncelleyin */}
          <p>Military Academy, Ankara, Turkey</p>
        </div>
      </div>

      <div
        id="professional"
        className={`timeline ${activeTab === "professional" ? "active" : ""}`}
      >
        <div className="event">
          <h3>Machine Learning Engineer</h3>{" "}
          {/* Profesyonel deneyiminizi güncelleyin */}
          <p>Alpine AI, Switzerland | August 2024 - November 2024</p>
        </div>
        <div className="event">
          <h3>Machine Learning Engineer</h3>{" "}
          {/* Profesyonel deneyiminizi güncelleyin */}
          <p>Nioya Tech LLC, Turkey | January 2019 - December 2022</p>
        </div>
        <div className="event">
          <h3>Data Analyst</h3> {/* Profesyonel deneyiminizi güncelleyin */}
          <p>Turkish Armed Forces, Turkey | August 2011 - August 2015</p>
        </div>
      </div>
    </div>
  );
}

export default Experience;