const assertionModelDetails = [
    {
      title: "Model Details",
  
      description:
        "This project provides a transformer-based deep learning model specifically designed for assertion status classification within clinical texts. It processes outputs from a Named Entity Recognition (NER) pipeline and determines the contextual assertion of identified entities, such as whether a medical problem is present, absent, hypothetical, or associated with someone else. This model plays a crucial role in improving the interpretability of clinical narratives, supporting decision-making in healthcare systems.",
  
      methods: "NER + Sequence Classification using  DeBERTaV2 and biobert-based architecture",
  
      users:
        "This model is particularly valuable for Clinical NLP researchers interested in understanding the context of medical entities. It is also beneficial for HealthTech developers integrating intelligent clinical text analysis features into EHR systems, clinical decision support tools, or medical chatbot applications. Furthermore, clinical informatics teams and data scientists can use this model to extract structured insights from unstructured clinical documentation, enabling better patient stratification and risk analysis.",
    },
  ];
  
  export default assertionModelDetails;
  