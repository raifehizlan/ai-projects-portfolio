import React from "react";
import "./ModelDetails.css"
const ModelDetails = () => (
  <section className="intro">
    <h1>Model Details</h1>
    <p>
      This model extracts and hides Protected Health Information (PHI) from German medical texts
      in accordance with HIPAA compliance.
    </p>
    <p>
      It combines regex-based and Transformer-based methods (Huggingface Transformers + regex).
      PHI entities not captured via NER model are detected using custom regex patterns.
    </p>
    <p>
      <strong>Intended Users:</strong> Researchers, data scientists, and developers who process medical documents
      and need anonymized, privacy-compliant datasets for training or analysis.
    </p>
  </section>
);

export default ModelDetails;
