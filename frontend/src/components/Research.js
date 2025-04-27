import React from 'react';
import './Research.css';

const researchProjects = [
  {
    id: 1,
    title: 'De-identification of PHI',
    description: (
      <>
        <p>
          <strong>Research Focus:</strong> Development and application of advanced Natural Language Processing (NLP) and Large Language Models (LLMs) for the anonymization of Protected Health Information (PHI) in multilingual medical texts.
        </p>
        <p>
          <strong>Methodology:</strong> LLM-in-the-Loop approach for creating expert AI models, fine-tuning pre-trained LLMs on specific de-identification tasks.
        </p>
        <p>
          <strong>Results:</strong> Achieved an average F1-score of up to 0.976 across eight different languages (English, German, Spanish, Romanian, Turkish, French, Italian, and Arabic), demonstrating the high precision of the developed solutions for sensitive healthcare data.
        </p>
        <p>
          <strong>Applications:</strong> Privacy-compliant processing of medical reports, clinical trials, and other healthcare data.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: 'NER Models for Adverse Drug Effects (ADE)',
    description: (
      <>
        <p>
          <strong>Research Focus:</strong> Development of Named Entity Recognition (NER) models for the precise identification of Adverse Drug Effects (ADE) and pharmaceutical relations in unstructured medical texts.
        </p>
        <p>
          <strong>Data Sources:</strong> Medical case reports and electronic health records (EHR).
        </p>
        <p>
          <strong>Multilingual Capabilities:</strong> Development of models that exhibit high accuracy in ADE recognition across multiple languages.
        </p>
        <p>
          <strong>Significance:</strong> Improving drug safety and supporting pharmacovigilance activities.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: 'Medical Coding with AI',
    description: (
      <>
        <p>
          <strong>Research Focus:</strong> Development of AI models for the automatic identification and assignment of ICD-10-CM (International Classification of Diseases, 10th Revision, Clinical Modification) and RxNorm (standardized nomenclature for clinical drugs) codes from clinical texts.
        </p>
        <p>
          <strong>Goal:</strong> Increasing efficiency and reducing errors in medical coding and classification of healthcare data.
        </p>
        <p>
          <strong>Potential Impact:</strong> Accelerating billing processes, improving data analysis and reporting in healthcare.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: 'ADE Classification Model',
    description: (
      <>
        <p>
          <strong>Research Focus:</strong> Development of classification models to categorize Adverse Drug Effects (ADE) in medical case reports and social media data.
        </p>
        <p>
          <strong>Goal:</strong> Gaining insights into the type and severity of ADEs from various text sources.
        </p>
        <p>
          <strong>Methods:</strong> Application of Machine Learning and NLP techniques for the classification of ADE-related information.
        </p>
      </>
    ),
  },
  {
    id: 5,
    title: 'Relation Extraction in Adverse Drug Effects (ADE)',
    description: (
      <>
        <p>
          <strong>Research Focus:</strong> Development of models for extracting relationships between medical entities, particularly in the context of Adverse Drug Effects (ADE).
        </p>
        <p>
          <strong>Data Sources:</strong> Medical case reports, electronic health records (EHR), and pharmacovigilance data.
        </p>
        <p>
          <strong>Goal:</strong> Automated identification of associations between drugs and their adverse effects to improve drug safety.
        </p>
      </>
    ),
  },
  {
    id: 6,
    title: 'Clinical Assertion Status Model',
    description: (
      <>
        <p>
          <strong>Research Focus:</strong> Development of a classification model to determine the assertion status of medical entities (e.g., problem, test, treatment) in relation to the patient within clinical documents.
        </p>
        <p>
          <strong>Categories:</strong> Distinguishing between present, absent, conditional, hypothetical, and other-related entities.
        </p>
        <p>
          <strong>Application:</strong> Improving the understanding of clinical texts and supporting applications such as automated patient record creation or decision support.
        </p>
      </>
    ),
  },
];

function Research() {
  return (
    <div className="research" id="research">
      <h1>Research</h1>
      <p className="research-intro">An overview of my research work and projects:</p>
      <div className="research-list">
        {researchProjects.map((project) => (
          <div className="research-item" key={project.id}>
            <h3>{project.title}</h3>
            <div className="research-description">{project.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Research;