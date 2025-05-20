import React from "react";
import "./ModelDetails.css";

const ModelDetails = ({ title, description, methods, users }) => (
  <section className="modelDetails">
    <h2 className="modeldetailsh1">{title}</h2>
    <p>{description}</p>
    <p>{methods}</p>
    <p>
      <strong>Intended Users:</strong> {users}
    </p>
  </section>
);

export default ModelDetails;
