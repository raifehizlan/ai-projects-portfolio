# LLM-gestützte mehrsprachige Anonymisierung von Gesundheitsdaten: Ein neuer Ansatz

Mit der zunehmenden Digitalisierung elektronischer Gesundheitsakten (EHR) wird es immer wichtiger, diese Daten unter Wahrung der Privatsphäre der Patienten zu nutzen. In diesem Beitrag stellen wir unsere mehrsprachigen De-Identification-Lösungen vor, die mithilfe großer Sprachmodelle (LLMs) entwickelt wurden – mit neuen State-of-the-Art (SOTA)-Ergebnissen.

---

## 💡 Warum De-Identification?

Gesundheitsdaten unterliegen strengen Datenschutzgesetzen (z. B. HIPAA, DSGVO). Für Forschung und KI-Entwicklung ist eine Anonymisierung zwingend erforderlich. Die meisten bestehenden Lösungen sind jedoch sprachspezifisch und hauptsächlich auf Englisch optimiert.

---

## 🧠 LLM-In-The-Loop-Ansatz

In unserer Forschung wurden LLMs in drei zentralen Phasen eingesetzt:

1. **Generierung synthetischer Daten:** Realistisch wirkende Fake-Daten wurden für fehlende Kategorien erstellt.
2. **Annotation-Unterstützung:** LLMs beschleunigten das Labeling nach i2b2-Richtlinien.
3. **Evaluation:** Modelle wie GPT-4o wurden für die Überprüfung der Ergebnisse eingesetzt.

Dies führte zu schnellerem Training und höherer Datenqualität.

---

## 🧾 Verwendete Daten und Labels

- **Englisch-Modell:** Getestet mit dem i2b2-2014-Testset; Trainingsdaten umfassten Open-Source-, synthetische und 22 % proprietäre Daten.
- **Weitere Sprachen:** Englische Daten wurden mit hochwertigen medizinischen Übersetzungsmodellen ins Türkische, Französische, Deutsche, Italienische, Spanische, Rumänische und Arabische übersetzt.
- Alle Daten wurden ins BIO-Format konvertiert.

Die PHI-Kategorien (Protected Health Information) umfassten unter anderem AGE, CITY, DATE, PATIENT, DOCTOR, ORGANIZATION und PHONE.

---

## 🔬 Modell- und Trainingsdetails

- **Englisch-Modell:** Fine-Tuning auf Basis von `microsoft/deberta-v3-small`.
- **Sprachspezifische Embeddings:**
  - Deutsch: `bert-base-german-cased`
  - Französisch: `camembert-bio-base`
  - Türkisch: `bert-base-turkish-cased`
  - usw.

Alle Modelle wurden über 10 Epochen mit `learning_rate=2e-5`, `max_length=512` trainiert.

---

## 📊 Ergebnisse

### Leistung auf Englisch (i2b2 Testset)

| Label         | F1-Score |
|---------------|----------|
| AGE           | 0.981    |
| CITY          | 0.944    |
| ORGANIZATION  | 0.876    |
| PATIENT       | 0.967    |
| ZIP           | 0.989    |
| **Makro Ø**   | **0.931**|

Im Vergleich zu anderen Methoden (z. B. Khin et al., GPT-4o) erzielen wir in mehreren Kategorien neue SOTA-Werte.

### Mehrsprachige Leistung

**Makro-F1-Scores:**

- **Türkisch:** 0.963  
- **Spanisch:** 0.957  
- **Französisch:** 0.937  
- **Arabisch:** 0.922  

Besonders bei Kategorien wie DATE, PHONE und MEDICALRECORD wurde sprachunabhängig hohe Genauigkeit erreicht.

---

## 🧩 Was macht diesen Ansatz besonders?

- Mehrsprachige Unterstützung.
- LLM-gestützte Datenerweiterung und Annotation.
- Hohe Qualität auch bei ressourcenarmen Sprachen.
- Effizientes Training kleiner, domänenspezifischer Modelle.

---

## 📌 Fazit und Beitrag

Diese Arbeit liefert einen wichtigen Beitrag zur Anonymisierung mehrsprachiger Gesundheitsdaten. Durch den gezielten Einsatz von LLMs ist eine präzise De-Identification selbst in ressourcenschwachen Sprachen möglich.

---

## 🔗 Quellen

- i2b2-Datensatz: [portal.dbmi.hms.harvard.edu](https://portal.dbmi.hms.harvard.edu)  
- LangTest Toolkit: [langtest.org](https://langtest.org/)  
- GPT-4o Testergebnisse: Siehe Anhang A  

---

*📬 Fragen oder ähnliche Projekte? Gerne austauschen!*
