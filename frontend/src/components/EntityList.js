import React from "react";
import "./EntityList.css"
import ENTITIES from "../data/deidEntities";


const EntityList = () => (
  <section className="entities">
    <h2>📋 Supported PHI Entity Types</h2>
    <ul className="entity-list">
      {ENTITIES.map((entity) => (
        <li key={entity}>{entity}</li>
      ))}
    </ul>
  </section>
);

export default EntityList;
