const clsModelDetails = [
    {
      title: "Model Details",
  
      description:
        "This model classifies medical texts in English to detect the presence of Adverse Drug Events (ADEs), helping to improve patient safety and support pharmacovigilance efforts.",
  
      methods: "It leverages a Transformer-based architecture (Huggingface Transformers) fine-tuned on labeled clinical corpora to identify whether a text indicates an ADE. The model returns classification results such as Positive (ADE present) or Negative (no ADE), along with confidence scores.",
  
      users:
        "Healthcare researchers, clinical NLP practitioners, and pharmacovigilance professionals who work with German medical data and aim to identify drug-related adverse effects for safety monitoring, reporting, or clinical studies.",
    },
  ];
  
  export default clsModelDetails;