import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css"
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className="floating-back-button" onClick={() => navigate("/#projects")}>
      ← Back
    </button>
  );
};

export default BackButton;
