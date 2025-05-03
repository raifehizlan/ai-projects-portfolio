const projectsData = [
  {
    id: 1,
    title: "De-identification of PHI",
    description:
      "Developed models for English, German, Spanish, Romanian, Turkish, French, Italian, and Arabic. Applied the LLM-in-the-Loop method for high-precision healthcare solutions.",
    technologies: [
      "Python",
      "NLP",
      "FastAPI",
      "LLMs",
      "Docker",
      "Azure",
      "React",
      "Transformers",
    ],
    image: "/img/deid.png",
    githubLink: "https://github.com/your-repo-1",
    liveDemoLink: "https://your-live-demo-1.com",
  },
  {
    id: 2,
    title: "NER Models for Adverse Drug Effects (ADE)",
    description:
      "Recognition of Adverse Drug Effects (ADE) and pharmaceutical relations in medical case reports and electronic health records. High accuracy in healthcare models.",
    technologies: [
      "Python",
      "NLP",
      "NER",
      "Transformers",
      "Flask",
      "Flasgger",
      "Docker",
      "Azure",
      "React",
    ],
    image: "/img/adeNer.jpeg",
    githubLink: "https://github.com/raifehizlan/projects-portfolio",
    liveDemoLink: "https://your-live-demo-2.com",
  },
  {
    id: 3,
    title: "ADE Classification Model",
    description:
      "Developed a classification model to categorize Adverse Drug Effects based on their type and severity from medical texts.",
    technologies: ["Python", "Machine Learning", "Classification"],
    image: "/img/adeClassification.jpeg", // Placeholder image
    githubLink: "https://github.com/raifehizlan/projects-portfolio",
    liveDemoLink: "https://your-live-demo-3.com",
  },
  {
    id: 4,
    title: "Relation Extraction Model",
    description:
      "Built a model to extract relationships between medical entities (e.g., drug-disease, drug-ADE) from clinical narratives.",
    technologies: ["Python", "NLP", "Relation Extraction"],
    image: "/img/relationExtraction.jpeg", // Placeholder image
    githubLink: "https://github.com/raifehizlan/projects-portfolio",
    liveDemoLink: "https://your-live-demo-4.com",
  },
  {
    id: 5,
    title: "Assertion Status Model",
    description:
      "Created a model to determine the assertion status of medical entities (e.g., present, absent, possible) within clinical documents.",
    technologies: ["Python", "NLP", "Assertion Detection"],
    image: "/img/assertionStatus.png", // Placeholder image
    githubLink: "https://github.com/raifehizlan/projects-portfolio",
    liveDemoLink: "https://your-live-demo-5.com",
  },
  {
    id: 6,
    title: "ICD-10 Code Finder Model",
    description:
      "Developed a model to automatically identify and assign relevant ICD-10 codes to patient diagnoses from medical text.",
    technologies: ["Python", "NLP", "ICD-10 Coding"],
    image: "/img/icd10Finder.jpeg", // Placeholder image
    githubLink: "https://github.com/raifehizlan/projects-portfolio",
    liveDemoLink: "https://your-live-demo-6.com",
  },
];

export default projectsData;