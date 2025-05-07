const relModelDetails = [
    {
      title: "Model Details",
  
      description:
        "This project delivers a transformer-based deep learning model tailored for relation extraction in clinical texts, specifically focused on posology (dose-related) information. The model identifies and links entities such as medication names, dosages, frequencies, durations, and routes of administration. By analyzing the semantic relationships between these entities, it structures drug regimen data that is often embedded in free-text clinical documentation. This structured output facilitates downstream applications such as medication summarization, adherence analysis, and pharmacovigilance.",
  
      methods:
        "NER + Relation Classification using a transformer-based architecture (e.g., DeBERTa, BioBERT, or ClinicalBERT), followed by rule-based or neural relation parsing for posology schema alignment.",
  
      users:
        "This model is particularly useful for Clinical NLP researchers working on medication understanding, and for HealthTech developers integrating medication intelligence into electronic health record (EHR) systems. Pharmaceutical informatics teams, clinical decision support system (CDSS) developers, and healthcare data scientists can leverage this model to extract structured drug regimen data for medication reconciliation, clinical audits, and patient safety monitoring.",
    },
  ];
  
  export default relModelDetails;
  