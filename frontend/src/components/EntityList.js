import React from "react";
import "./EntityList.css";
import entities from "../data/entities";

const EntityList = ({ model }) => {
  // Props'u destructuring ile alın
  const entitiess = entities[model] || [];
  return (
    <section className="entities">
      <h2>📋 Supported Entity Types</h2>
      <ul className="entity-list">
        {entitiess.map((entity) => (
          <li key={entity}>{entity}</li>
        ))}
      </ul>
    </section>
  );
};

export default EntityList;