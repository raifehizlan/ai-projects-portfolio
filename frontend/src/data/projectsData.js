const projectsData = [
    {
      id: 1,
      title: 'De-identification of PHI',
      description:
        'Developed models for English, German, Spanish, Romanian, Turkish, French, Italian, and Arabic. Applied the LLM-in-the-Loop method for high-precision healthcare solutions.',
      technologies: ['Python', 'NLP', 'LLMs', 'Healthcare'],
      image: '/img/deid.png', 
      githubLink: 'https://github.com/your-repo-1',
      liveDemoLink: 'https://your-live-demo-1.com',
    },
    {
      id: 2,
      title: 'NER Models for Adverse Drug Effects',
      description:
        'Recognition of Adverse Drug Effects (ADE) and pharmaceutical relations in medical case reports and electronic health records. High accuracy in multiple languages.',
      technologies: ['Python', 'NLP', 'NER'],
      image: '/img/adeNer.jpeg',
      githubLink: 'https://github.com/your-repo-2',
      liveDemoLink: null, // Canlı demo yoksa null olabilir
    },
    // Diğer projeleriniz buraya eklenecek...
  ];
  
  export default projectsData;