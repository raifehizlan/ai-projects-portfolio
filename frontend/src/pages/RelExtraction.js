import React from "react";
import RelationVisualizer from "../components/RelationVisualizer";
import output from "../data/output"; // JSON verisini import et

function RelExtraction() {
  return (
    <div className="rel">
      <h1>Relation Extraction Results</h1>
      <RelationVisualizer output={output} />
    </div>
  );
}

export default RelExtraction;
