import React from "react";
import "./EntityList.css"

const ENTITIES = [
  "AGE", "CITY", "COUNTRY", "DATE", "DOCTOR", "EMAIL", "HOSPITAL", "IDNUM",
  "ORGANIZATION", "PATIENT", "PHONE", "PROFESSION", "SSN", "STREET", "ZIP",
  "ACCOUNT", "DLN", "IP", "FAX", "LICENCE", "PLATE", "URL", "VIN"
];

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
