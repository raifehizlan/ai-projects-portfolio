# 🧠 ML Platform – Microservice Architecture for ML Inference

Welcome to the **Projects Portfolio**, a robust and scalable machine learning platform developed using **microservices** and powered by **Azure Container Apps** and **Azure Container Registry**.

This project demonstrates a full-stack, production-ready deployment pipeline for various ML models—deployed independently and maintained via CI/CD.

---

## 🚀 Live Architecture

- **Frontend**: React app for user interaction.
- **Backend**: FastAPI service for API orchestration.
- **ML Models**:
  - `model-deid`: De-identification
  - `model-ner`: Named Entity Recognition
  - `model-assertion`: Assertion detection
  - `model-relation`: Entity Relationship Extraction
  - `model-classification`: Text Classification

Each component runs in a **separate container** and is deployed independently via **Azure Container Apps**.

---

## 📦 Tech Stack

| Layer       | Technology                            |
|-------------|----------------------------------------|
| Frontend    | React, TypeScript                     |
| Backend     | Python, FastAPI                       |
| ML Models   | Transformers, HuggingFace |
| CI/CD       | GitHub Actions, Docker                |
| Deployment  | Azure Container Apps + ACR            |
| Storage     | Azure Blob-table Storage                    |

---

## 🔄 CI/CD Workflow

The platform is fully automated with **GitHub Actions**:

- Detects changes per directory (`frontend/`, `backend/`, or model folders).
- Builds and pushes Docker images to Azure Container Registry.
- Updates the corresponding Azure Container App.
- Automatically prunes old container images (via retention policy).

---

## 📁 Project Structure

```
.
├── frontend/               # React UI
├── backend/                # API gateway & routing
└── ml_models/
    ├── model_deid/
    ├── model_ner/
    ├── model_assertion/
    ├── model_relation/
    └── model_cls/
```

---

## ⚙️ How to Run Locally

> Requirements: Docker, Python 3.9+, Node.js (for frontend)

### 1. Clone the repo:
```bash
git clone https://github.com/raifehizlan/projects-portfolio.git
cd projects-portfolio
```


## ☁️ Deployment

Everything is containerized and deployed via Azure:

- **Azure Container Registry (ACR)** hosts all built images.
- **Azure Container Apps** host each service.
- **GitHub Actions** automates CI/CD per service.

To deploy:
1. Push to `main`
2. GitHub Actions builds & pushes containers
3. Azure automatically updates services

---

## 🧹 Image Retention Policy (ACR)

The registry is configured to:

- Keep only the **2 most recent images**
- Automatically delete **untagged** and **unused** images
- Reduce clutter and save storage

---

## 📬 Contact

📧 raifehizlan@gmail.com  
