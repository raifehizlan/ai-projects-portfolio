import React from "react";
import "./ModelDetails.css";

const ModelDetails = ({ title, description, methods, users }) => (
  <section className="intro">
    <h1 className="introh1">{title}</h1>
    <p>{description}</p>
    <p>{methods}</p>
    <p>
      <strong>Intended Users:</strong> {users}
    </p>
  </section>
);

export default ModelDetails;
