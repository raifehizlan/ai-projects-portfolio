# LLM-Supported Multilingual Health Data De-Identification: A New Approach

As electronic health records (EHR) become increasingly digitized, leveraging them while preserving patient privacy is more critical than ever. In this post, we share our multilingual de-identification solutions powered by large language models (LLMs), along with our new state-of-the-art (SOTA) performance results.

---

## 💡 Why De-Identification?

Health data is strictly regulated under laws such as HIPAA and GDPR. Anonymization is essential for using such data in research and AI development. However, most existing solutions are language-dependent and optimized primarily for English.

---

## 🧠 LLM-In-The-Loop Methodology

In our research, LLMs were integrated at three key stages:

1. **Synthetic Data Generation:** Realistic fake data was generated to fill category gaps.
2. **Annotation Support:** LLMs accelerated labeling based on i2b2 annotation guidelines.
3. **Evaluation:** LLMs like GPT-4o were used for cross-checking the final outputs.

This resulted in faster model training and improved data quality.

---

## 🧾 Data and Labels Used

- **English Model:** Tested on the i2b2-2014 test set; training data included open-source data + synthetic data + 22% proprietary data.
- **Other Languages:** English data was translated using high-quality medical translation models into Turkish, French, German, Italian, Spanish, Romanian, and Arabic.
- All datasets were converted into BIO format.

PHI (Protected Health Information) label categories included AGE, CITY, DATE, PATIENT, DOCTOR, ORGANIZATION, PHONE, among others.

---

## 🔬 Model and Training Details

- **English Model:** Fine-tuned on `microsoft/deberta-v3-small`.
- **Language-Specific Embeddings:**
  - German: `bert-base-german-cased`
  - French: `camembert-bio-base`
  - Turkish: `bert-base-turkish-cased`
  - etc.

All models were trained for 10 epochs with `learning_rate=2e-5`, `max_length=512`.

---

## 📊 Results

### English Performance (i2b2 Test Set)

| Label         | F1 Score |
|---------------|----------|
| AGE           | 0.981    |
| CITY          | 0.944    |
| ORGANIZATION  | 0.876    |
| PATIENT       | 0.967    |
| ZIP           | 0.989    |
| **Macro Avg.**| **0.931**|

Compared to other methods (e.g., Khin et al., GPT-4o), our approach achieves SOTA in several categories.

### Multilingual Performance

**Macro-Average F1 Scores:**

- **Turkish:** 0.963  
- **Spanish:** 0.957  
- **French:** 0.937  
- **Arabic:** 0.922  

High accuracy was achieved across languages, especially in categories like DATE, PHONE, and MEDICALRECORD.

---

## 🧩 What Makes This Approach Unique?

- Multilingual support.
- LLM-assisted data augmentation and annotation.
- Strong results even in low-resource languages.
- High performance with small domain-specific models instead of only large models.

---

## 📌 Conclusion and Contributions

This study presents significant contributions to multilingual health data anonymization. Strategic use of LLMs enables high-accuracy de-identification even in low-resource languages.

---

## 🔗 References

- i2b2 Dataset: [portal.dbmi.hms.harvard.edu](https://portal.dbmi.hms.harvard.edu)  
- LangTest Toolkit: [langtest.org](https://langtest.org/)  
- GPT-4o Evaluation: See Appendix A  

---

*📬 Got questions or working on similar projects? Let’s discuss!*
