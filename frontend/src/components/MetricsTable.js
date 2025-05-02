import React from "react";
import "./MetricsTable.css"
import METRICS from "../data/deidMetrics";


const MetricsTable = () => (
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

export default MetricsTable;
