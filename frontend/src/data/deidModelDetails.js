const deidModelDetails = [
    {title:"Model Details",
    
    description:"This model extracts and hides Protected Health Information (PHI) from German medical texts in accordance with HIPAA compliance.",

    methods:"It combines regex-based and Transformer-based methods (Huggingface Transformers + regex). PHI entities not captured via NER model are detected using custom regex patterns.",

    users:"Researchers, data scientists, and developers who process medical documents and need anonymized, privacy-compliant datasets for training or analysis."  
    }
]

export default deidModelDetails;