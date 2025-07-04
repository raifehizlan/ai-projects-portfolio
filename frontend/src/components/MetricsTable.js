import React from "react";
import "./MetricsTable.css";
import deidMetrics from "../data/deidMetrics";
import nerMetrics from "../data/nerMetrics";
import clsMetrics from "../data/clsMetrics";
import assMetrics from "../data/assMetrics";
import relMetrics from "../data/relMetrics";

const MetricsTable = ({ model }) => {
  let METRICS = [];

  // Model'e göre doğru metrik verisini seçiyoruz
  if (model === "ner") {
    METRICS = nerMetrics;
  } else if (model === "deid") {
    METRICS = deidMetrics;
  } else if (model === "cls") {
    METRICS = clsMetrics;
  } else if (model === "ass") {
    METRICS = assMetrics;
  } else if (model === "rel") {
    METRICS = relMetrics;
  }

  return (
    <section className="metrics">
      <h2>📈 Model Performance</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Precision</th>
            <th>Recall</th>
            <th>F1-score</th>
            <th>Support</th>
          </tr>
        </thead>
        <tbody>
          {METRICS.map(([name, p, r, f1, sup]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{p}</td>
              <td>{r}</td>
              <td>{f1}</td>
              <td>{sup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MetricsTable;
